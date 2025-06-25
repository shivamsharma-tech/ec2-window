pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'shivamsharam/ec2-window'
        EC2_IP = '51.21.171.137'
         EC2_USER = 'Administrator'
    }

    stages {
        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                bat "docker build -t ${env.DOCKER_IMAGE}:${env.BUILD_NUMBER} ."
            }
        }

        stage('Login to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'Docker-access', usernameVariable: 'DOCKERHUB_USER', passwordVariable: 'DOCKERHUB_PASS')]) {
                    bat 'echo %DOCKERHUB_PASS% | docker login -u %DOCKERHUB_USER% --password-stdin'
                }
            }
        }

        stage('Push Docker Image to Docker Hub') {
            steps {
                bat "docker push ${env.DOCKER_IMAGE}:${env.BUILD_NUMBER}"
            }
        }

        stage('Deploy to AWS EC2') {
            steps {
                echo '🚀 Starting SSH Deployment...'

               withCredentials([sshUserPrivateKey(credentialsId: 'window-ec2', keyFileVariable: 'KEY_PATH', usernameVariable: 'SSH_USER')]) {
    bat '''
for /f "delims=" %%u in ('whoami') do (
  echo Updating permissions for %%u
  icacls "%KEY_PATH%" /inheritance:r
  icacls "%KEY_PATH%" /grant:r "%%u:R"
)

ssh -o StrictHostKeyChecking=no -i "%KEY_PATH%" %SSH_USER%@%EC2_IP% ^
  docker pull %DOCKER_IMAGE%:%BUILD_NUMBER% ^
  && docker stop ec2-window || exit /b 0 ^
  && docker rm ec2-window || exit /b 0 ^
  && docker run -d --name ec2-window -p 3000:3000 %DOCKER_IMAGE%:%BUILD_NUMBER%
'''
}

                echo '✅ SSH Deployment Done'
            }
        }
    }

    post {
        success {
            echo "✅ Deployment successful! Docker tag: ${env.BUILD_NUMBER}"
        }
        failure {
            echo '❌ Deployment failed. Check logs.'
        }
    }
}
