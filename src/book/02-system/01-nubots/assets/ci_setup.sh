#!/bin/bash
BUILDKITE_AGENT_TOKEN="<INSERT AGENT TOKEN HERE>"
DOCKER_LOGIN_PASSWORD="<INSERT DOCKERHUB ACCOUNT PASSWORD HERE>"

# Print the credentials for reference
echo BUILDKITE_AGENT_TOKEN=${BUILDKITE_AGENT_TOKEN}
echo DOCKER_LOGIN_PASSWORD=${DOCKER_LOGIN_PASSWORD}

# Remove old Docker
apt-get remove docker docker-engine docker.io containerd runc

# Install packages to allow apt to use a repository over HTTPS
apt-get update
apt-get install apt-transport-https ca-certificates curl gnupg-agent software-properties-common

# Add Docker’s official GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -

# Add Docker's stable repository
add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
​
# Install latest Docker CE
apt-get update
apt-get install docker-ce docker-ce-cli containerd.io

# Create a 'docker' user group and add local users to allow for use without sudo
sudo groupadd docker                     # Create user group
sudo usermod -aG docker nubots           # Add nubots to the group
sudo usermod -aG docker buildkite-agent  # Add buildkite-agent to the group
newgrp docker                            # Activate group changes

# Configure Docker to run on system startup
systemctl enable docker

# Add the signed Buildkite apt repository
echo "deb https://apt.buildkite.com/buildkite-agent stable main" | tee /etc/apt/sources.list.d/buildkite-agent.list
apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 32A37959C2FA5C3C99EFBC32A79206696452D198

# Install the Buildkite agent
apt-get update
apt-get install -y buildkite-agent

# Add the agent token to the configuration file
sed -i "s/xxx/${BUILDKITE_AGENT_TOKEN}/g" /etc/buildkite-agent/buildkite-agent.cfg

# Start the agent and schedule it to run on system startup
systemctl enable buildkite-agent && systemctl start buildkite-agent

# Make the DockerHub login password available to agents via an environment variable
echo -e "set -e\n export DOCKER_LOGIN_PASSWORD=\"${DOCKER_LOGIN_PASSWORD}\"" > /etc/buildkite-agent/hooks/environment
chmod +x /etc/buildkite-agent/hooks/environment

# Set `dockerhub` tag on the agent to indicate that it has the login credentials
sed -i "$a tags=\"dockerhub=true\"" /etc/buildkite-agent/buildkite-agent.cfg
