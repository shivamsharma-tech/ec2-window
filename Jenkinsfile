pipeline {
    agent any

    parameters {
        string(name: 'GIT_COMMIT', defaultValue: 'main', description: 'Git branch or commit hash to deploy')
    }

    environment {
        DOCKER_CREDENTIALS_ID = 'Docker-access'            // Docker Hub credential ID
        DOCKER_IMAGE = 'shivamsharam/ec2-window'      // Docker image name
        EC2_CREDENTIALS = 'ubuntu'                         // EC2 SSH key credential ID
        EC2_USER = 'Administrator'                                // EC2 username
        EC2_IP = '51.21.171.137'                              // EC2 public IP
    }

    stages {
        stage('Test Docker Access') {
            steps {
                sh 'docker ps'
            }
        }

        stage('Checkout SCM') {
            steps {
                git branch: "${params.GIT_COMMIT}", url: 'https://github.com/shivamsharma-tech/ec2-window'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                    docker build -t $DOCKER_IMAGE:$BUILD_NUMBER .
                    docker tag $DOCKER_IMAGE:$BUILD_NUMBER $DOCKER_IMAGE:latest
                '''
            }
        }

        stage('Login to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: env.DOCKER_CREDENTIALS_ID, usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    sh '''
                        echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
                    '''
                }
            }
        }

        stage('Push Docker Image to Docker Hub') {
            steps {
                sh '''
                    docker push $DOCKER_IMAGE:$BUILD_NUMBER
                    docker push $DOCKER_IMAGE:latest
                '''
            }
        }

        stage('Deploy to AWS EC2') {
            steps {
                powershell script: '''
    $session = New-PSSession -ComputerName $env:EC2_IP -Credential (Get-Credential)
    Invoke-Command -Session $session -ScriptBlock {
        docker pull $env:DOCKER_IMAGE:$env:BUILD_NUMBER
        docker stop ec2-window -ErrorAction SilentlyContinue
        docker rm ec2-window -ErrorAction SilentlyContinue
        docker run -d --name ec2-window -p 3000:3000 $env:DOCKER_IMAGE:$env:BUILD_NUMBER
    }
    Remove-PSSession -Session $session
'''
            }
        }
    }

    post {
        success {
            echo "✅ Deployment successful! Docker tag: $BUILD_NUMBER"
        }
        failure {
            echo '❌ Deployment failed. Check logs.'
        }
    }
}
