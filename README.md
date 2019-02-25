# README

Prerequisite : make sure you have docker engine installed on your machine 

Mac - https://docs.docker.com/docker-for-mac/install/ 
Windows - https://docs.docker.com/docker-for-windows/install/


## Starting up the instance
Startup the application using 
` docker-compose up -d`

Once you start the docker, you should be able to access the django application on:
http://localhost:8000

and the React App on:
http://localhost:3000

## Rebuild Docker Images
If you make changes to python's requirements.txt or add Node packages in package.json, you'll need to rebuild the docker images using the following command:

` docker-compose up -d --build`
