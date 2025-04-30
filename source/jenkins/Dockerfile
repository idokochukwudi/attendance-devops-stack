# 🧱 Use the official Jenkins LTS base image
FROM jenkins/jenkins:lts

# ⚙️ Switch to root temporarily to install additional packages
USER root

# 📂 Accept Docker group ID from host (to match /var/run/docker.sock permissions)
ARG DOCKER_GID=982

# 📦 Install required packages, Docker CLI, Docker Compose, and gosu
RUN apt-get update && apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release \
    software-properties-common \
    bash \
    gosu && \
    # 🔐 Add Docker GPG key
    curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg && \
    # 📦 Add Docker repository
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] \
    https://download.docker.com/linux/debian $(lsb_release -cs) stable" > /etc/apt/sources.list.d/docker.list && \
    # 🐳 Install Docker CLI
    apt-get update && apt-get install -y docker-ce-cli && \
    # 📦 Install Docker Compose
    curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" \
    -o /usr/local/bin/docker-compose && chmod +x /usr/local/bin/docker-compose && \
    # 🧹 Clean up unnecessary files
    rm -rf /var/lib/apt/lists/*

# ➕ Create Docker group using host's GID and add Jenkins user to it
RUN groupadd -g ${DOCKER_GID} docker && usermod -aG docker jenkins

# 👤 Switch back to Jenkins user for better security
USER jenkins

# ✅ Start Jenkins as usual (this must not be removed)
CMD ["java", "-jar", "/usr/share/jenkins/jenkins.war"]
