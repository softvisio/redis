FROM softvisio/node

HEALTHCHECK NONE

RUN \
    echo "vm.overcommit_memory = 1" >> /etc/sysctl.conf \
    && dnf install -y redis \
    \
    # install deps
    && npm i --unsafe --only=prod \
    \
    # clean npm cache
    && rm -rf ~/.npm-cache
