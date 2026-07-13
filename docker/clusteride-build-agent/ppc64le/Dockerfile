FROM ubuntu:focal

ARG TARGETARCH

ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=Etc/UTC

RUN apt-get update && apt-get install -y \
    build-essential \
    sudo \
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
    xz-utils \
    && ln -fs /usr/share/zoneinfo/Etc/UTC /etc/localtime \
    && dpkg-reconfigure --frontend noninteractive tzdata \
    && rm -rf /var/lib/apt/lists/*

RUN if [ "$TARGETARCH" = "amd64" ]; then \
      curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
      && apt-get install -y nodejs \
      && rm -rf /var/lib/apt/lists/*; \
    else \
      curl -fsSL https://nodejs.org/dist/v24.15.0/node-v24.15.0-linux-ppc64le.tar.xz \
      | tar -xJ -C /usr/local --strip-components=1 \
      && npm install -g yarn; \
    fi

CMD ["/bin/bash"]
