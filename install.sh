#!/usr/bin/env bash

rm -rv node_modules build # remove directories

mkdir build
mkdir build/static
cp -rv resources build
npm cache clear
npm install
npm rebuild node-sass #error with node-sass
bower install
webpack
npm run babel:build