# define docker image
# with notes from
# https://www.digitalocean.com/community/tutorials/how-to-build-a-node-js-application-with-docker

# Each Dockerfile must begin with a FROM instruction.
# This image includes Node.js and npm. 
# The alpine image is derived from the Alpine Linux project, 
# and will help us keep our image size down. 
FROM node:15-alpine

# By default, the Docker Node image includes a non-root node user 
# that you can use to avoid running your application container as root. 
# It is a recommended security practice to avoid running containers as 
# root and to restrict capabilities within the container to only those 
# required to run its processes. We will therefore use the node 
# user’s home directory as the working directory for our application 
# and set them as our user inside the container.

# Creating these directories will ensure that they have the permissions 
# we want, which will be important when we create local node modules 
# in the container with npm install.
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

# If a WORKDIR isn’t set, Docker will create one by default, so it’s a good 
# idea to set it explicitly.
WORKDIR /home/node/app

# Adding this COPY instruction before running npm install or copying the 
# application code allows us to take advantage of Docker’s caching mechanism. 
# At each stage in the build, Docker will check to see if it has a layer cached 
# for that particular instruction. If we change package.json, this layer will be 
# rebuilt, but if we don’t, this instruction will allow Docker to use the 
# existing image layer and skip reinstalling our node modules. 
COPY package*.json ./

# To ensure that all of the application files are owned by the non-root node user, 
# including the contents of the node_modules directory, switch the user to 
# node before running npm install:
USER node

RUN npm install

# copy your application code with the appropriate permissions to the application 
# directory on the container:
# This will ensure that the application files are owned by the non-root node user.
COPY --chown=node:node . .

# expose port 8080 on the container
# EXPOSE does not publish the port, but instead functions as a way of 
# documenting which ports on the container will be published at runtime. 
EXPOSE 8080

# CMD runs the command to start the application — in this case, node app.js. 
# Note that there should only be one CMD instruction in each Dockerfile. 
# If you include more than one, only the last will take effect.
CMD [ "node", "app.js" ]
