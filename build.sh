#!/bin/bash

npm install
npm run build
rm -rf ../arbitrage-app/dist/public/*
cp -r ./build/static/css ../arbitrage-app/dist/public
cp -r ./build/static/js ../arbitrage-app/dist/public