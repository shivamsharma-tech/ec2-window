pipeline {
  agent any

  environment {
    IMAGE   = 'shivamsharam/ec2-window'
    TAG     = "${BUILD_NUMBER}"
    REMOTE  = 'Administrator@13.61.104.200'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build Docker Image') {
      steps {
        bat "docker build -t %IMAGE%:%TAG% ."
      }
    }

    stage('Docker Login') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'Docker-access', usernameVariable: 'DU', passwordVariable: 'DP')]) {
          bat """
            echo %DP% | docker login -u %DU% --password-stdin
          """
        }
      }
    }

    stage('Push to DockerHub') {
      steps {
        bat "docker push %IMAGE%:%TAG%"
      }
    }

    stage('Deploy to Windows EC2') {
      steps {
        withCredentials([sshUserPrivateKey(credentialsId: 'window-ec2-key', keyFileVariable: 'KEY')]) {
          bat """
            pscp -i "%KEY%" -pw "" -r -batch -unsafe * %REMOTE%:C:/app/
          """
          bat """
            plink -i "%KEY%" -batch %REMOTE% ^
              "docker pull %IMAGE%:%TAG% && ^
               docker stop ec2-window || exit 0 && ^
               docker rm ec2-window || exit 0 && ^
               docker run -d --name ec2-window -p 3000:3000 %IMAGE%:%TAG%"
          """
        }
      }
    }
  }

  post {
    success {
      echo '✅ Deployment Complete!'
    }
    failure {
      echo '❌ Deployment Failed!'
    }
  }
}
