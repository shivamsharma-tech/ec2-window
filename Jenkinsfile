pipeline {
  agent any
  environment {
    IMAGE = 'shivamsharam/ec2-window'
    TAG = "${env.BUILD_NUMBER}"
    REMOTE = 'Administrator@51.21.171.137'
  }
  stages {
    stage('Checkout') { steps { checkout scm } }
    stage('Build') {
      steps { bat "docker build -t %IMAGE%:%TAG% ." }
    }
    stage('Docker Login') {
      steps {
        withCredentials([usernamePassword(credentialsId:'Docker-access', usernameVariable:'DU', passwordVariable:'DP')]) {
          bat "echo %DP% | docker login -u %DU% --password-stdin"
        }
      }
    }
    stage('Push') { steps { bat "docker push %IMAGE%:%TAG%" } }
    stage('Deploy') {
      steps {
        withCredentials([sshUserPrivateKey(credentialsId: 'window-ec2-key', keyFileVariable:'KEY')]) {
          bat """
            scp -i "%KEY%" -o StrictHostKeyChecking=no . %REMOTE%:C:/app/
            ssh -i "%KEY%" -o StrictHostKeyChecking=no %REMOTE% "docker pull %IMAGE%:%TAG% && docker stop ec2-window || exit 0 && docker rm ec2-window || exit 0 && docker run -d --name ec2-window -p 3000:3000 %IMAGE%:%TAG%"
          """
        }
      }
    }
  }
  post {
    success { echo '✅ Done' }
    failure { echo '❌ Failed' }
  }
}
