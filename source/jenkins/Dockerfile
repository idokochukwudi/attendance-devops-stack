# Use the official Jenkins LTS image
FROM jenkins/jenkins:lts

# Switch to root user to install packages
USER root

# Install Docker and Docker Compose
RUN apt-get update && \
    apt-get install -y \
    docker.io \
    curl \
    && curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose && \
    chmod +x /usr/local/bin/docker-compose && \
    usermod -aG docker jenkins

# Switch back to the jenkins user
USER jenkins
