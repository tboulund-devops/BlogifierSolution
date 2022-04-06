pipeline {
    agent any
    stages {
        stage("Build UI") {
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
                sh "mkdir screenshots"
                sh "chmod a=rwx screenshots"
            }
        }
        stage("Execute UI tests") {
            parallel {
                stage("Firefox") {
                    steps {
                        sh "docker run --rm -v ${PWD}/ui-test:/tests -v ${PWD}/screenshots:/screenshots -it testcafe/testcafe firefox /tests/*.js"
                    }
                }
                stage("Chromium") {
                    steps {
                        sh "docker run --rm -v ${PWD}/ui-test:/tests -v ${PWD}/screenshots:/screenshots -it testcafe/testcafe chromium /tests/*.js"
                    }
                }
            }
        }
    }
}