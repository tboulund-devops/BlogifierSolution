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
                build job: "Blogifier/02 - Deploy to production", wait: false, parameters: [
                    string(name: "TAG_NUMBER", value: env.BUILD_NUMBER)
                ]
            }
        }
    }
}