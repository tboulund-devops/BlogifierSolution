pipeline {
    agent any
    environment {
        TIMESTAMP = sh(script: "date +%s", returnStdout: true).trim()
        SCREENSHOT_PATH = "screenshots/${TIMESTAMP}"
    }
    stages {
        stage("Build") {
            steps {
                dir("src/Blogifier") {
                    sh "dotnet publish Blogifier.csproj -o ../../outputs"
                }
                sh "docker build ."
            }
        }
        stage("Unit tests") {
            steps {
                sh "rm -rf /wwwroot/data/1/2020/12/"
                dir("tests/Blogifier.Tests") {
                    sh "dotnet test"
                }
            }
        }
        stage("Setup manual test env") {
            steps {
                sh "docker-compose --env-file environments/test-manual.env down"
                sh "docker-compose --env-file environments/test-manual.env up"
            }
        }
        stage("Deliver to registry") {
            steps {
                sh "docker-compose push blogifier"
            }
        }
        stage("Release to production") {
            steps {
                build job: "Blogifier-Production", wait: false
            }
        }
    }
}