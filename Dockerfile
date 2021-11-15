FROM zerocluster/node

HEALTHCHECK NONE

RUN \
    echo "vm.overcommit_memory = 1" >> /etc/sysctl.conf \
    && apt update && apt install -y redis-latest \
    \
    # install deps
    && npm i --omit=dev \
    \
    # cleanup
    && curl -fsSL https://raw.githubusercontent.com/softvisio/scripts/main/env-build-node.sh | /bin/bash -s -- cleanup
