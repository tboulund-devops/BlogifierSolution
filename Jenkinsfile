pipeline {
    agent any
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
                sh "rm -rf src/Blogifier/wwwroot/data/1/2020/12/"
                dir("tests/unit/Blogifier.Tests") {
                    sh "dotnet test"
                }
            }
        }
        stage("Setup manual test env") {
            steps {
                sh "docker-compose --env-file environments/test-manual.env down"
                sh "docker-compose --env-file environments/test-manual.env up -d"
            }
        }
        stage("Deliver to registry") {
            steps {
                sh "docker-compose --env-file environments/test-manual.env push blogifier"
            }
        }
        stage("Release to production") {
            steps {
                build job: "Blogifier-Production", wait: false, parameters: [
                    string(name: "TAG_NUMBER", value: env.BUILD_NUMBER)
                ]
            }
        }
    }
}