# use with https://github.com/casey/just
# like make, but just a command runner

# list targets
help:
    @just --list

# install all dependencies
#. use lerna?
install:
    brew install parallel # run cmds in parallel
    brew install expect # includes unbuffer, which can restore color output

#. currently,
# yarn backend
# "backend": "COMMAND=start CONFIG_FILE=../../setups/demo/config.yaml npm-run-all --parallel --print-label --race gateway driver-bookmarks driver-filesys",
# node packages/neomem-gateway/src/index.js
data SETUP='demo':
    NEOMEM_CONFIG_FILE=setups/{{SETUP}}/config.yaml \
    PORT=4000 node_modules/.bin/nodemon packages/neomem-gateway/src/server.js

console:
    cd packages/neomem-console && yarn start

# # npm run --prefix packages/neomem-gateway start
# # start a setup with all services, e.g. `just run` or `just run demo`
# run SETUP='demo':
#     cd packages/neomem-gateway && \
#     CONFIG_FILE=../../setups/{{SETUP}}/config.yaml npm run start
