pipeline {
    agent any
    environment {
        TIMESTAMP = sh(script: "date +%s", returnStdout: true).trim()
        SCREENSHOT_PATH = "screenshots/${TIMESTAMP}"
    }
    stages {
        stage("Build UI") {
            steps {
                dir("src/Blogifier") {
                    sh "dotnet publish Blogifier.csproj -o ../../outputs"
                }
            }
        }
        stage("Reset test environment") {
            steps {
                sh "docker-compose down"
                sh "docker-compose up -d --build"
                sh "mkdir -p ${SCREENSHOT_PATH}"
                sh "chmod a=rwx ${SCREENSHOT_PATH}"
            }
        }
        stage("Execute UI tests") {
            parallel {
                /*stage("Firefox") {
                    steps {
                        sh "docker run --rm -v ${WORKSPACE}/ui-test:/tests -v ${SCREENSHOT_PATH}:/screenshots testcafe/testcafe firefox /tests/*.js"
                    }
                }*/
                stage("Chromium") {
                    steps {
                        sh "docker run --rm -v ${WORKSPACE}/ui-test:/tests -v ${WORKSPACE}/${SCREENSHOT_PATH}:/screenshots --env BASE_URL=http://devops.setgo.dk:9876 testcafe/testcafe chromium /tests/*.js"
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