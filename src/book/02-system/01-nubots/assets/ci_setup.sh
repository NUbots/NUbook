#!/bin/bash
BUILDKITE_AGENT_TOKEN="<INSERT AGENT TOKEN HERE>"
DOCKER_LOGIN_PASSWORD="<INSERT DOCKERHUB ACCOUNT PASSWORD HERE>"

# Check for root
echo "** Checking if running with root privileges **"
if [[ $(id -u) -ne 0 ]] ; then echo "Please run as root" ; exit 1 ; fi

if [ "$BUILDKITE_AGENT_TOKEN" = "<INSERT AGENT TOKEN HERE>" ]; then
    echo "Buildkite agent token not set"
    exit 1
else
    echo BUILDKITE_AGENT_TOKEN=${BUILDKITE_AGENT_TOKEN}
fi
if [ "$DOCKER_LOGIN_PASSWORD" = "<INSERT DOCKERHUB ACCOUNT PASSWORD HERE>" ]; then
    echo "Dockerhub password not set"
    exit 1
else
    echo DOCKER_LOGIN_PASSWORD=${DOCKER_LOGIN_PASSWORD}
fi

# Remove old Docker
echo "** Removing existing docker installations **"
apt-get remove docker docker-engine docker.io containerd runc

# Install packages to allow apt to use a repository over HTTPS
echo "** Installing support utils (e.g. curl) **"
apt-get update
apt-get install -y apt-transport-https ca-certificates curl gnupg-agent software-properties-common

# Install Docker
echo "** Install Docker **"
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -
add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
apt-get update
apt-get install -y docker-ce docker-ce-cli containerd.io

# Install the Buildkite agent
echo "** Install Buildkite **"
echo "deb https://apt.buildkite.com/buildkite-agent stable main" | tee /etc/apt/sources.list.d/buildkite-agent.list
apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 32A37959C2FA5C3C99EFBC32A79206696452D198
apt-get update
apt-get install -y buildkite-agent

# Create a 'docker' user group and add local users to allow for use without sudo
echo "** Set up the Docker Groups **"
groupadd docker                     # Create user group
usermod -aG docker nubots           # Add nubots to the group
usermod -aG docker buildkite-agent  # Add buildkite-agent to the group

# Configure Docker to run on system startup
systemctl enable docker

# Add the agent token to the configuration file
echo "** Set up buildkite **"
sed -i "s/xxx/${BUILDKITE_AGENT_TOKEN}/g" /etc/buildkite-agent/buildkite-agent.cfg

systemctl enable buildkite-agent && systemctl start buildkite-agent

# Make the DockerHub login password available to agents via an environment variable
echo -e "set -e\nexport DOCKER_LOGIN_PASSWORD=\"${DOCKER_LOGIN_PASSWORD}\"" > /etc/buildkite-agent/hooks/environment
chmod +x /etc/buildkite-agent/hooks/environment

# Set `dockerhub` tag on the agent to indicate that it has the login credentials
grep -qxF 'tags="dockerhub=true"' /etc/buildkite-agent/buildkite-agent.cfg || echo 'tags="dockerhub=true"' >> /etc/buildkite-agent/buildkite-agent.cfg

echo "** Done **"