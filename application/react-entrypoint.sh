#!/bin/bash

cd /application/frontend
echo "Checking for new NPM Packages"
npm install
echo "Starting React App Server"
npm start