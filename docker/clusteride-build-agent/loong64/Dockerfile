# loong64 - no public base image on Docker Hub
# Use Node.js from unofficial-builds.nodejs.org
FROM debian:bookworm-slim

ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=Etc/UTC

RUN apt-get update && apt-get install -y \
    build-essential \
    git \
    curl \
    ca-certificates \
    python3 \
    pkg-config \
    tzdata \
    libx11-dev \
    libx11-xcb-dev \
    libxkbfile-dev \
    libsecret-1-dev \
    libgtk-3-dev \
    libkrb5-dev \
    libnss3-dev \
    libasound2-dev \
    libcups2-dev \
    libstdc++6 \
    libatomic1 \
    && ln -fs /usr/share/zoneinfo/Etc/UTC /etc/localtime \
    && dpkg-reconfigure --frontend noninteractive tzdata \
    && rm -rf /var/lib/apt/lists/*

# Node.js from unofficial-builds (loong64 not on nodesource)
RUN curl -fsSL https://unofficial-builds.nodejs.org/download/release/v20.18.0/node-v20.18.0-linux-loong64.tar.xz \
    | tar -xJ -C /usr/local --strip-components=1 \
    && npm install -g yarn

CMD ["/bin/bash"]
