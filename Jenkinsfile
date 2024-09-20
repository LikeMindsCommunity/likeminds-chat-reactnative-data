pipeline {
    agent any
    tools {nodejs "nodejs"}

    options {
        buildDiscarder logRotator(daysToKeepStr: '7', numToKeepStr: '1')
    }

    parameters {
        stashedFile 'chat_js_data_package'
    }

    environment {
        NODE_OPTIONS = "--max-old-space-size=8192"  // Setting the memory limit for Node.js
    }

    stages {

        stage('file upload'){
            steps{
                unstash 'chat_js_data_package'
                sh 'mv chat_js_data_package $chat_js_data_package_FILENAME'
                sh 'ls'
            }
        }
        
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
                sh 'npm uninstall @likeminds.community/chat-js'
                sh 'npm install $chat_js_data_package_FILENAME'
            }
        }

        stage('Build') {
            steps {
                sh 'export NODE_OPTIONS="--max-old-space-size=8192" && npm run build'
            }
        }

        stage('Package') {
            steps {
                sh 'npm pack'
            }
        }

        stage('Archive Package') {
            steps {
                archiveArtifacts artifacts: '*.tgz', fingerprint: true
            }
        }
    }

    // post {
    //     always {
    //         cleanWs()
    //     }
    // }

}