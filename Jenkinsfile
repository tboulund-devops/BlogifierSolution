pipeline {
    agent any
    stages {
        stage("Build UI") {
            when {
                changeset "src/**"
            }
            steps {
                sh "dotnet build --output outputs"
            }
        }
        stage("Test environment") {
            steps {
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
                        sh "docker run --rm -v ${WORKSPACE}/ui-test:/tests -v ${WORKSPACE}/screenshots:/screenshots testcafe/testcafe firefox /tests/*.js"
                    }
                }
                stage("Chromium") {
                    steps {
                        sh "docker run --rm -v ${WORKSPACE}/ui-test:/tests -v ${WORKSPACE}/screenshots:/screenshots testcafe/testcafe chromium /tests/*.js"
                    }
                }
            }
        }
    }
}