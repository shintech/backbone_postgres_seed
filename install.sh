#!/usr/bin/env bash

if [ -d "node_modules" ] || [ -d "build" ]; then # check if node modules or build exists and remove
  echo "node_modules exists, removing..."
  rm -rv node_modules build --force
fi

mkdir build && \
mkdir build/static && \
cp -rv resources build && \
npm install && \

# echo "workaround for node-sass error" && \
# npm cache clear && \
# npm rebuild node-sass && \

bower install && \
webpack && \
npm run babel:build && \
npm test