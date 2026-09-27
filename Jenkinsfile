pipeline {
    agent any

    environment {
        DOCKER = 'C:\\Users\\saich\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe'
    }

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
                bat '%DOCKER% build -t devops-assignment-tracker:%BUILD_NUMBER% .'
            }
        }

        stage('Run Container') {
            steps {
                bat '%DOCKER% rm -f assignment-tracker-test || exit /b 0'

                bat '%DOCKER% run -d --name assignment-tracker-test -p 3001:3000 devops-assignment-tracker:%BUILD_NUMBER%'

                bat 'timeout /t 5 /nobreak'

                bat 'curl -f http://localhost:3001/'
            }
        }
    }

    post {
        always {
            bat '%DOCKER% rm -f assignment-tracker-test || exit /b 0'
        }
    }
}