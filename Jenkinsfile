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
    withCredentials([sshUserPrivateKey(credentialsId: 'window-ec2-key', keyFileVariable: 'KEY_PATH', usernameVariable: 'SSH_USER')]) {
        bat """
            echo Deploying using SSH key...
            ssh -i %KEY_PATH% -o StrictHostKeyChecking=no %SSH_USER%@51.21.171.137 ^
            "docker pull shivamsharam/ec2-window:latest && docker stop ec2-window || exit 0 && docker rm ec2-window || exit 0 && docker run -d --name ec2-window -p 3000:3000 shivamsharam/ec2-window:latest"
        """
    }
}

    }

    post {
        success { echo '✅ Deployment successful.' }
        failure { echo '❌ Deployment failed.' }
    }
}
