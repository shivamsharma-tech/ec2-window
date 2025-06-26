pipeline {
    agent any

    environment {
        IMAGE_NAME = "shivamsharam/ec2-window"
        IMAGE_TAG = "latest"
        REMOTE_HOST = "51.21.171.137"
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                bat "docker build -t %IMAGE_NAME%:%IMAGE_TAG% ."
            }
        }

        stage('Login to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'Docker-access', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    bat "echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin"
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                bat "docker push %IMAGE_NAME%:%IMAGE_TAG%"
            }
        }

        stage('Deploy on EC2') {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'windows-ec2-key', keyFileVariable: 'KEY_PATH', usernameVariable: 'SSH_USER')]) {
                    bat """
                        echo Deploying to Windows EC2...

                        set KEY_COPY=C:\\Users\\Administrator\\id_rsa
                        copy "%KEY_PATH%" "%KEY_COPY%" > nul
                        icacls "%KEY_COPY%" /inheritance:r > nul

                        ssh -i "%KEY_COPY%" -o StrictHostKeyChecking=no %SSH_USER%@%REMOTE_HOST% ^
                        "docker pull %IMAGE_NAME%:%IMAGE_TAG% && ^
                         docker stop ec2-window || exit 0 && ^
                         docker rm ec2-window || exit 0 && ^
                         docker run -d --name ec2-window -p 3000:3000 %IMAGE_NAME%:%IMAGE_TAG%"
                    """
                }
            }
        }
    }

    post {
        success {
            echo '✅ Deployment Successful!'
        }
        failure {
            echo '❌ Deployment Failed!'
        }
    }
}
