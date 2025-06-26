pipeline {
    agent any

    environment {
        IMAGE_NAME = 'shivamsharam/ec2-window'
        TAG = 'latest'
        REMOTE_USER = 'Administrator'
        REMOTE_HOST = '51.21.171.137'
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
                bat "docker build -t %IMAGE_NAME%:%TAG% ."
            }
        }

        stage('Login to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'Docker-access', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    bat 'echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin'
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                bat "docker push %IMAGE_NAME%:%TAG%"
            }
        }

               stage('Deploy to EC2') {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'window-ec2', keyFileVariable: 'KEY_PATH')]) {
                    powershell """
                        Write-Host 'Fixing SSH key permissions...'
                        \$keyPath = \$env:KEY_PATH
                        \$acl = Get-Acl \$keyPath
                        \$acl.SetAccessRuleProtection(\$true, \$false)
                        \$rule = New-Object System.Security.AccessControl.FileSystemAccessRule("\$env:USERNAME", "Read", "Allow")
                        \$acl.SetAccessRule(\$rule)
                        Set-Acl \$keyPath \$acl

                        Write-Host 'Deploying to EC2...'
                        ssh -o StrictHostKeyChecking=no -i "\$keyPath" ${env.REMOTE_USER}@${env.REMOTE_HOST} `
                          "docker pull ${env.IMAGE_NAME}:${env.TAG} && `
                           docker stop ${env.CONTAINER_NAME} || true && `
                           docker rm ${env.CONTAINER_NAME} || true && `
                           docker run -d --name ${env.CONTAINER_NAME} -p ${env.REMOTE_APP_PORT}:${env.LOCAL_APP_PORT} ${env.IMAGE_NAME}:${env.TAG}"
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
