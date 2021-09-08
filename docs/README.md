# Introduction

Redis service for docker swarm.

## Install

Use `docker-stack.yaml` and `.config.yaml` files, provided in this repository.

```shell
# mark node for deployment
docker node update --label-add redis=true <NODE-NAME>

# deploy
docker stack deploy --with-registry-auth -c docker-stack.yaml redis
```
