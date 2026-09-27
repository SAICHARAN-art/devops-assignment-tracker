pipeline {
  agent any
  stages {
    stage('Checkout') { steps { checkout scm } }
    stage('Install Dependencies') { steps { sh 'npm ci' } }
    stage('Unit Tests') { steps { sh 'npm test' } }
    stage('Build Docker Image') { steps { sh 'docker build -t devops-assignment-tracker:${BUILD_NUMBER} .' } }
    stage('Run Container') {
      steps {
        sh 'docker rm -f assignment-tracker-test || true'
        sh 'docker run -d --name assignment-tracker-test -p 3000:3000 devops-assignment-tracker:${BUILD_NUMBER}'
        sh 'sleep 5'
        sh 'curl -f http://localhost:3000/api/health'
      }
    }
  }
  post {
    always { sh 'docker rm -f assignment-tracker-test || true' }
  }
}
