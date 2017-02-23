#!/usr/bin/env bash

if [ -d "node_modules" ]; then # check if node modules or build exists and remove
  echo "node_modules exists, removing..."
  rm -rv node_modules build --force
fi

mkdir build
mkdir build/static
cp -rv resources build
npm cache clear
npm install
npm rebuild node-sass #error with node-sass / workaround
bower install
webpack
npm run babel:build