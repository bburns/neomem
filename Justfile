# use with https://github.com/casey/just
# like make, but just a command runner

# list targets
help:
    @just --list

# # install all dependencies (also need node/npm, yarn, git)
# install:
#     cd packages/neomem-console && yarn install
#     cd packages/diode/code/application/datadiode/contrib/nodejs && npm install

# # install development tools
# install-dev:
#     brew install netcat
#     pip install -U Sphinx

# # make and deploy sphinx docs
# docs:
#     cd docs && make html && http-server build/html
#     cd docs && firebase deploy


data:
    cd packages/neomem-data && \
    yarn start

console:
    cd packages/neomem-console && \
    yarn start

# # run
# # SETUP is a variable, the name of the setup folder to use

# # start a setup with all services, e.g. `just run` or `just run demo`
# run SETUP='demo' SERVICE='':
#     FILE=setups/{{SETUP}}/docker-compose.yaml && \
#     docker-compose --file $FILE down && \
#     docker-compose --file $FILE up --build --remove-orphans {{SERVICE}} && \
#     docker-compose --file $FILE rm -fsv
