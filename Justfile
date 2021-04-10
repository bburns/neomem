# use with https://github.com/casey/just
# like make, but just a command runner

# list targets
help:
    @just --list

data:
    yarn backend

console:
    cd packages/neomem-console && \
    yarn start
