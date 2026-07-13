FROM ubuntu:24.04

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
    xz-utils \
    && ln -fs /usr/share/zoneinfo/Etc/UTC /etc/localtime \
    && dpkg-reconfigure --frontend noninteractive tzdata \
    && rm -rf /var/lib/apt/lists/*

# Node.js from unofficial-builds (Nodesource only supports amd64/arm64)
RUN curl -fsSL https://unofficial-builds.nodejs.org/download/release/v24.18.0/node-v24.18.0-linux-riscv64.tar.xz \
    | tar -xJ -C /usr/local --strip-components=1 \
    && npm install -g yarn

CMD ["/bin/bash"]
