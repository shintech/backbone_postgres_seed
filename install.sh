#!/usr/bin/env bash

mkdir app/build
mkdir app/static
cp -rv resources app/build
npm cache clear
npm install
npm rebuild node-sass
bower install
webpack
npm run babel:build