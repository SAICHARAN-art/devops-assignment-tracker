pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Unit Tests') {
            steps {
                bat 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t devops-assignment-tracker:%BUILD_NUMBER% .'
            }
        }

        stage('Run Container') {
            steps {
                bat 'docker rm -f assignment-tracker-test || exit /b 0'
                bat 'docker run -d --name assignment-tracker-test -p 3000:3000 devops-assignment-tracker:%BUILD_NUMBER%'
                bat 'timeout /t 5 /nobreak'
                bat 'curl -f http://localhost:3000/'
            }
        }
    }

    post {
        always {
            bat 'docker rm -f assignment-tracker-test || exit /b 0'
        }
    }
}