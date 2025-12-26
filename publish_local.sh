#!/bin/bash
export NODE_HOME=$PWD/node-v20.10.0-darwin-arm64
export PATH=$NODE_HOME/bin:$PATH
echo "Using Node: $(node -v)"
echo "Using NPM: $(npm -v)"

# Install dependencies just in case
npm install

# Build for production
echo "Building for production..."
npm run build

# Start production server
echo "Starting production server..."
npm run start
