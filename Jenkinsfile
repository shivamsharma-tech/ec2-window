pipeline {
    agent any

    parameters {
        string(name: 'GIT_COMMIT', defaultValue: 'main', description: 'Git branch or commit hash to deploy')
    }

    environment {
        DOCKER_CREDENTIALS_ID = 'Docker-access'
        DOCKER_IMAGE = 'shivamsharam/ec2-window'
        EC2_CREDENTIALS = 'window'
        EC2_USER = 'Administrator'
        EC2_IP = '51.21.171.137'
    }

    stages {
        stage('Test Docker Access') {
            steps {
                bat 'docker ps'
            }
        }

        stage('Checkout SCM') {
            steps {
                git branch: "${params.GIT_COMMIT}", url: 'https://github.com/shivamsharma-tech/ec2-window'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat """
                    docker build -t %DOCKER_IMAGE%:%BUILD_NUMBER% .
                    docker tag %DOCKER_IMAGE%:%BUILD_NUMBER% %DOCKER_IMAGE%:latest
                """
            }
        }

        stage('Login to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: env.DOCKER_CREDENTIALS_ID, usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    bat """
                        echo %DOCKER_PASSWORD% | docker login -u %DOCKER_USERNAME% --password-stdin
                    """
                }
            }
        }

        stage('Push Docker Image to Docker Hub') {
            steps {
                bat """
                    docker push %DOCKER_IMAGE%:%BUILD_NUMBER%
                    docker push %DOCKER_IMAGE%:latest
                """
            }
        }

        stage('Deploy to AWS EC2') {
            options {
                timeout(time: 2, unit: 'MINUTES') // prevent hanging
            }
            steps {
                echo "🛫 Starting SSH Deployment..."
                withCredentials([sshUserPrivateKey(credentialsId: env.EC2_CREDENTIALS, keyFileVariable: 'KEY')]) {
                    bat """
                        powershell -Command "icacls '%KEY%' /inheritance:r /grant:r '%USERNAME%:R' /remove:g 'Users'"
                        ssh -o StrictHostKeyChecking=no -i "%KEY%" %EC2_USER%@%EC2_IP% ^
                        docker pull %DOCKER_IMAGE%:%BUILD_NUMBER% ^&^& ^
                        docker stop ec2-window || exit /b 0 ^&^& ^
                        docker rm ec2-window || exit /b 0 ^&^& ^
                        docker run -d --name ec2-window -p 3000:3000 %DOCKER_IMAGE%:%BUILD_NUMBER%
                    """
                }
                echo "✅ SSH Deployment Done"
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
