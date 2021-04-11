# use with https://github.com/casey/just
# like make, but just a command runner

# list targets
help:
    @just --list

# "backend": "COMMAND=start npm-run-all --parallel --print-label --race data data-bookmarks", 
data:
    yarn backend

console:
    cd packages/neomem-console && yarn start

# npm run --prefix packages/neomem-gateway start
# start a setup with all services, e.g. `just run` or `just run demo`
run SETUP='demo':
    cd packages/neomem-gateway && \
    CONFIG_FILE=../../setups/{{SETUP}}/config.yaml npm run start
