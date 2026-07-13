FROM ubuntu:focal

ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=Etc/UTC

RUN apt-get update && apt-get install -y \
    build-essential \
    git \
    curl \
    wget \
    jq \
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

RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

RUN npm install -g yarn

CMD ["/bin/bash"]
