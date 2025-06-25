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

                withCredentials([sshUserPrivateKey(credentialsId: 'window-ec2', keyFileVariable: 'KEY_PATH', usernameVariable: `{%EC2_USER%}`)]) {
                    bat """
                        for /f %%u in ('whoami') do set JENKINS_USER=%%u
                        icacls "%KEY_PATH%" /inheritance:r
                        icacls "%KEY_PATH%" /grant:r "%JENKINS_USER%:R"

                        ssh -o StrictHostKeyChecking=no -i "%KEY_PATH%" %EC2_USER%@${env.EC2_IP} ^
                        docker pull ${env.DOCKER_IMAGE}:${env.BUILD_NUMBER} ^
                        && docker stop ec2-window || exit /b 0 ^
                        && docker rm ec2-window || exit /b 0 ^
                        && docker run -d --name ec2-window -p 3000:3000 ${env.DOCKER_IMAGE}:${env.BUILD_NUMBER}
                    """
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
