#!/bin/bash
export NODE_HOME=$PWD/node-v20.10.0-darwin-arm64
export PATH=$NODE_HOME/bin:$PATH
echo "Using Node: $(node -v)"
echo "Using NPM: $(npm -v)"
npm install
npm run dev
