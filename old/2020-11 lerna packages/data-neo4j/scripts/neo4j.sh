# run neo4j in a docker container

# usage:
#    ./scripts/neo4j.sh
# to view status
#    docker ps
# to stop it when done
#    docker stop nmtest

# options: 
# env = envars - this one disables authentication
# name = friendly name
# rm = cleanup local volume when done
# detach = detach container / run in bg
# neo4j = the image to run

# note: incremented the published ports by one so they don't 
# conflict with the local neo4j server.

# Default connectors and their ports:
# Connector name	Protocol	Default port number
# dbms.connector.bolt Bolt 7687
# dbms.connector.http HTTP 7474
# dbms.connector.https HTTPS 7473

docker run \
    --env NEO4J_AUTH=none \
    --name nmtest \
    --publish=7475:7474 \
    --publish=7688:7687 \
    --volume=$HOME/neo4j/data:/data \
    --rm \
    --detach \
    neo4j

docker ps
