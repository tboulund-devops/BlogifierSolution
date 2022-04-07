pipeline {
    agent any
    environment {
        SCREENSHOT_PATH = sh(script: "mktemp -d", returnStdout: true)
    }
    stages {
        stage("Build UI") {
            when {
                changeset "src/**"
            }
            steps {
                dir("src/Blogifier") {
                    sh "dotnet publish Blogifier.csproj -o ../../outputs"
                }
            }
        }
        stage("Test environment") {
            steps {
                sh "docker-compose down"
                sh "docker-compose build"
                sh "docker-compose up -d"
            }
        }
        stage("Prepare UI tests") {
            steps {
                sh "mkdir -p screenshots"
                sh "chmod a=rwx screenshots"
            }
        }
        stage("Execute UI tests") {
            parallel {
                stage("Firefox") {
                    steps {
                        sh "docker run --rm -v ${WORKSPACE}/ui-test:/tests -v ${SCREENSHOT_PATH}:/screenshots testcafe/testcafe firefox /tests/*.js"
                    }
                }
                stage("Chromium") {
                    steps {
                        sh "docker run --rm -v ${WORKSPACE}/ui-test:/tests -v ${SCREENSHOT_PATH}:/screenshots testcafe/testcafe chromium /tests/*.js"
                    }
                }
            }
            post {
                always {
                    archiveArtifacts artifacts: "${SCREENSHOT_PATH}/**"
                }
            }
        }
    }
}