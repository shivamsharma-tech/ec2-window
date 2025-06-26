pipeline {
    agent any

    environment {
        IMAGE = 'shivamsharam/ec2-window:latest'
        HOST = '51.21.171.137'
        USER = 'Administrator'
        CONTAINER = 'ec2-window'
        PORT = '3000'
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                bat "docker build -t %IMAGE% ."
            }
        }

        stage('Docker Login & Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'Docker-access', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    bat """
                        echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin
                        docker push %IMAGE%
                    """
                }
            }
        }

        stage('Deploy on EC2') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'window-ec2', usernameVariable: 'SSH_USER', passwordVariable: 'SSH_PASS')]) {
                    bat """
                        echo Deploying to EC2...
                        plink.exe -ssh %USER%@%HOST% -pw %SSH_PASS% ^
                          "docker pull %IMAGE% && docker stop %CONTAINER% || exit 0 && docker rm %CONTAINER% || exit 0 && docker run -d --name %CONTAINER% -p %PORT%:%PORT% %IMAGE%"
                    """
                }
            }
        }
    }

    post {
        success { echo '✅ Deployment successful.' }
        failure { echo '❌ Deployment failed.' }
    }
}
