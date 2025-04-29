# ------------------------------------------
# Base Image: Use the official Jenkins LTS (Long Term Support) image
# This provides a preconfigured Jenkins environment
# ------------------------------------------
    FROM jenkins/jenkins:lts

    # ------------------------------------------
    # Switch to root user
    # Required for installing system-level packages (like Docker and curl)
    # ------------------------------------------
    USER root
    
    # ------------------------------------------
    # Install Docker and Docker Compose
    # - Update package list
    # - Install docker.io package (Docker engine)
    # - Install curl (used to download Docker Compose)
    # - Download Docker Compose binary from GitHub
    # - Make Docker Compose executable
    # - Add the 'jenkins' user to the 'docker' group
    #   so Jenkins can run Docker commands
    # ------------------------------------------
    RUN apt-get update && \
        apt-get install -y docker.io curl && \
        curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" \
        -o /usr/local/bin/docker-compose && \
        chmod +x /usr/local/bin/docker-compose && \
        getent group docker || groupadd docker && \
        usermod -aG docker jenkins         
    
    # ------------------------------------------
    # Switch back to the 'jenkins' user
    # This ensures Jenkins runs with its default non-root privileges
    # ------------------------------------------
    USER jenkins
    