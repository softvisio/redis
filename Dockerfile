FROM zerocluster/node

HEALTHCHECK NONE

RUN \
    echo "vm.overcommit_memory = 1" >> /etc/sysctl.conf \
    && dnf install -y redis \
    \
    # install deps
    && npm i --omit=dev \
    \
    # cleanup node build environment
    && curl -fsSL https://raw.githubusercontent.com/softvisio/scripts/main/env-build-node.sh | /bin/bash -s -- cleanup
