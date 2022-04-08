def ResetEnvironments(envs) {
    envs.each { e -> 
        sh "docker-compose --env-file environments/${e}.env down"
    }
    sh "docker-compose --env-file environments/${name}.env build"
    envs.each { e -> 
        sh "docker-compose -p ${e} --env-file environments/${e}.env up -d"
    }
}

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
                ResetEnvironments(["test1", "test2"])
                //ResetEnvironment("test2", false)
                // sh "docker-compose --env-file environments/Test1.env down"
                // sh "docker-compose --env-file environments/Test2.env down"
                // sh "docker-compose --env-file environments/Test1.env build"
                // sh "docker-compose --env-file environments/Test2.env build"
                // sh "docker-compose -p test2 --env-file environments/Test1.env up -d"
                // sh "docker-compose -p test1 --env-file environments/Test2.env up -d"
                sh "mkdir -p ${SCREENSHOT_PATH}"
                sh "chmod a=rwx ${SCREENSHOT_PATH}"
            }
        }
        stage("Execute UI tests") {
            // The following uses a synchronous approach resetting the environment in between each run
            /*stages {
                stage("Firefox") {
                    steps {
                        sh "docker run --rm -v ${WORKSPACE}/ui-test:/tests -v ${WORKSPACE}/${SCREENSHOT_PATH}:/screenshots --env BASE_URL=http://devops.setgo.dk:9876 testcafe/testcafe firefox /tests/*.js"
                    }
                }
                stage("Reset for Chrome") {
                    steps {
                        sh "docker-compose down"
                        sh "docker-compose up -d"
                    }
                }
                stage("Chromium") {
                    steps {
                        sh "docker run --rm -v ${WORKSPACE}/ui-test:/tests -v ${WORKSPACE}/${SCREENSHOT_PATH}:/screenshots --env BASE_URL=http://devops.setgo.dk:9876 testcafe/testcafe chromium /tests/*.js"
                    }
                }
            }*/
            // The following approach will run the tests in parallel but on two different environments
            parallel {
                stage("Firefox") {
                    steps {
                        sh "docker run --rm -v ${WORKSPACE}/ui-test:/tests -v ${WORKSPACE}/${SCREENSHOT_PATH}:/screenshots --env BASE_URL=http://devops.setgo.dk:9876 testcafe/testcafe firefox /tests/*.js"
                    }
                }
                stage("Chromium") {
                    steps {
                        sh "docker run --rm -v ${WORKSPACE}/ui-test:/tests -v ${WORKSPACE}/${SCREENSHOT_PATH}:/screenshots --env BASE_URL=http://devops.setgo.dk:9877 testcafe/testcafe chromium /tests/*.js"
                    }
                }
            }
            post {
                always {
                    archiveArtifacts artifacts: "${SCREENSHOT_PATH}/**", allowEmptyArchive: true
                }
            }
        }
    }
}