#!/bin/bash
BUILDKITE_AGENT_TOKEN="replace-this"
DOCKER_LOGIN_PASSWORD="replace-this"

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

# Create a 'docker' user group and add local users
groupadd docker                    # Create user group
usermod -aG docker nubots          # Add nubots user to group
usermod -aG docker buildkite-agent # Add buildkite-agent to group
newgrp docker                           # Activate group changes
# Configure Docker to start on boot
systemctl enable docker

# Add the signed buildkite apt repository
echo "deb https://apt.buildkite.com/buildkite-agent stable main" | tee /etc/apt/sources.list.d/buildkite-agent.list
apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 32A37959C2FA5C3C99EFBC32A79206696452D198
# Install the agent
apt-get update
apt-get install -y buildkite-agent
# Configure the agent token
sed -i "s/xxx/${BUILDKITE_AGENT_TOKEN}/g" /etc/buildkite-agent/buildkite-agent.cfg
# Start the agent
systemctl enable buildkite-agent &&   systemctl start buildkite-agent

# Make the docker login password an environment variable
echo -e "set -e\n export DOCKER_LOGIN_PASSWORD=\"${DOCKER_LOGIN_PASSWORD}\""  > /etc/buildkite-agent/hooks/environment
chmod +x /etc/buildkite-agent/hooks/environment

# Set the dockerhub tag to true
sed -i "$a tags=\"dockerhub=true\"" /etc/buildkite-agent/buildkite-agent.cfg