pipeline {
    agent any

    environment {
        IMAGE_NAME = 'shivamsharam/ec2-window'
        TAG = 'latest' // or use build number: "${env.BUILD_NUMBER}"
        REMOTE_USER = 'Administrator'
        REMOTE_HOST = '51.21.171.137'
        REMOTE_PORT = '22'
        CONTAINER_NAME = 'ec2-window'
        REMOTE_APP_PORT = '3000'
        LOCAL_APP_PORT = '3000'
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                bat "docker build -t ${IMAGE_NAME}:${TAG} ."
            }
        }

        stage('Login to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'Docker-access', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    bat """ 
                        echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin
                    """
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                bat "docker push ${IMAGE_NAME}:${TAG}"
            }
        }

        stage('Deploy to EC2') {
    steps {
        withCredentials([sshUserPrivateKey(credentialsId: 'window-ec2', keyFileVariable: 'KEY_PATH')]) {
            bat """
                echo Fixing SSH key permissions...
                icacls "%KEY_PATH%" /inheritance:r
                for /F "delims=" %%u in ('whoami') do icacls "%KEY_PATH%" /grant:r "%%u:R"
                
                echo Deploying to EC2...
                ssh -o StrictHostKeyChecking=no -i "%KEY_PATH%" %REMOTE_USER%@%REMOTE_HOST% ^
                  "docker pull ${IMAGE_NAME}:${TAG} ^
                  && docker stop ${CONTAINER_NAME} || exit 0 ^
                  && docker rm ${CONTAINER_NAME} || exit 0 ^
                  && docker run -d --name ${CONTAINER_NAME} -p ${LOCAL_APP_PORT}:${REMOTE_APP_PORT} ${IMAGE_NAME}:${TAG} & exit"
            """
        }
    }
}


    }

    post {
        success {
            echo '✅ Deployment completed successfully.'
        }
        failure {
            echo '❌ Deployment failed.'
        }
    }
}
