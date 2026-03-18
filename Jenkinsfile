pipeline {
    agent any

    environment {
        HARBOR_HOST = 'harbor.niconi.space:4433'
        HARBOR_PROTOCOL = 'https'
        HARBOR_PROJECT = 'self-resume'
        IMAGE_NAME = 'self-resume'

        GITEA_URL = 'http://gitea:3000/NICO/self-resume.git'
        GITEA_TOKEN_CRED_ID = 'gitea-credentials'

        HARBOR_AUTH_ID = 'harbor-credentials-self-resume'

        // 定义默认版本前缀，可根据需要调整
        DEFAULT_VERSION_PREFIX = 'dev'
    }

    stages {
        stage('Pull Code') {
            steps {
                checkout([$class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[
                        url: env.GITEA_URL,
                        credentialsId: env.GITEA_TOKEN_CRED_ID
                    ]],
                    // 【关键】确保拉取所有 tags，否则无法检测到版本号
                    extensions: [[$class: 'CloneOption', noTags: false]]
                ])
            }
        }

        stage('Determine Version') {
            steps {
                script {
                    // 1. 获取分支和 Commit 信息
                    def branchName = sh(script: 'git rev-parse --abbrev-ref HEAD', returnStdout: true).trim()
                    def commitId = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()

                    echo "🚀 当前分支: ${branchName}"
                    echo "📝 当前 Commit: ${commitId}"

                    // 2. 尝试获取当前 Commit 关联的 Git Tag
                    def gitTag = sh(script: 'git tag --points-at HEAD', returnStdout: true).trim()

                    def version = ""
                    def isRelease = false

                    if (gitTag) {
                        // 取第一个标签
                        def rawTag = gitTag.split('\n')[0]

                        // 【核心修改】自动去除开头的 'v' 或 'V'
                        // 例如: v1.0.0 -> 1.0.0 | V2.0.0 -> 2.0.0 | 1.0.0 -> 1.0.0 (无变化)
                        version = rawTag.replaceFirst(/^[vV]/, '')

                        isRelease = true
                        echo "✅ 发现发布标签 [${rawTag}]，清洗后版本号确定为: ${version}"
                    } else {
                        // 如果没有标签，生成开发版版本号
                        // 注意：分支名中的 '/' 需要替换，因为 Docker tag 不支持 '/'
                        def safeBranch = branchName.replace('/', '-')
                        version = "${DEFAULT_VERSION_PREFIX}-${safeBranch}-${commitId}"
                        echo "⚠️ 未发现发布标签，生成开发版本号: ${version}"
                    }

                    // 将版本号和状态传递给后续阶段
                    env.APP_VERSION = version
                    env.IS_RELEASE_BUILD = isRelease.toString()
                }
            }
        }

        stage('Build & Push Image') {
            steps {
                script {
                    def baseImageName = "${env.HARBOR_PROJECT}/${env.IMAGE_NAME}"
                    def fullImage = "${env.HARBOR_HOST}/${baseImageName}:${env.APP_VERSION}"
                    def registryUrl = "${env.HARBOR_PROTOCOL}://${env.HARBOR_HOST}"

                    // 如果是发布版，额外定义 latest 标签
                    def latestImage = "${env.HARBOR_HOST}/${baseImageName}:latest"

                    withCredentials([usernamePassword(
                        credentialsId: env.HARBOR_AUTH_ID,
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )]) {
                        try {
                            sh """
                                # 1. 登录 Registry
                                echo "\${DOCKER_PASS}" | docker login ${registryUrl} -u "\${DOCKER_USER}" --password-stdin

                                # 2. 构建镜像
                                echo "🔨 开始构建镜像: ${fullImage}"
                                docker build --no-cache -t ${fullImage} .

                                # 3. 推送版本镜像
                                echo "📤 推送版本镜像: ${env.APP_VERSION}"
                                docker push ${fullImage}

                                # 4. 策略性推送 latest 标签
                                if [ "${env.IS_RELEASE_BUILD}" == "true" ]; then
                                    echo "🏷️ 这是一个发布版本，更新 latest 标签..."
                                    docker tag ${fullImage} ${latestImage}
                                    docker push ${latestImage}
                                    echo "✅ 发布完成: ${env.APP_VERSION} (also latest)"
                                else
                                    echo "⏭️ 这是一个开发版本，跳过 latest 标签推送，防止污染生产环境。"
                                fi
                            """
                        } catch (Exception e) {
                            echo "❌ Build/Push failed: ${e.message}"
                            throw e
                        } finally {
                            sh "docker logout ${registryUrl} || true"
                        }
                    }
                }
            }
        }
    }
}