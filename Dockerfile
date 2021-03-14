FROM softvisio/core

HEALTHCHECK NONE

RUN \
    dnf install -y redis \
    \
    # install deps
    && npm i --unsafe --only=prod \
    \
    # clean npm cache
    && rm -rf ~/.npm-cache
