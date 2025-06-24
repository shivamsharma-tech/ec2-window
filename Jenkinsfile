pipeline {
    agent any

    parameters {
        string(name: 'GIT_COMMIT', defaultValue: 'main', description: 'Git branch or commit hash to deploy')
    }

    environment {
        DOCKER_CREDENTIALS_ID = 'Docker-access'
        DOCKER_IMAGE = 'shivamsharam/ec2-window'
        EC2_CREDENTIALS = 'windows-ec2-key'
        EC2_USER = 'Administrator'
        EC2_IP = '51.21.171.137'
    }

    stages {
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

        stage('Push Docker Image') {
            steps {
                sh '''
                    docker push $DOCKER_IMAGE:$BUILD_NUMBER
                    docker push $DOCKER_IMAGE:latest
                '''
            }
        }

        stage('Deploy to AWS EC2') {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: env.EC2_CREDENTIALS, keyFileVariable: 'KEY')]) {
                    sh """
                        ssh -o StrictHostKeyChecking=no -i "$KEY" $EC2_USER@$EC2_IP ^
                        "powershell -NoProfile -Command \"
                            docker pull $DOCKER_IMAGE:$BUILD_NUMBER;
                            docker stop ec2-window -ErrorAction SilentlyContinue;
                            docker rm ec2-window -ErrorAction SilentlyContinue;
                            docker run -d --name ec2-window -p 3000:3000 $DOCKER_IMAGE:$BUILD_NUMBER
                        \""
                    """
                }
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
