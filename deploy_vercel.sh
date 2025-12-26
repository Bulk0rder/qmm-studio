#!/bin/bash
export NODE_HOME=$PWD/node-v20.10.0-darwin-arm64
export PATH=$NODE_HOME/bin:$PATH

echo ">>> Step 1: Login to Vercel (Required)"
npx vercel login

echo ">>> Step 2: Deploying to Vercel"
# Deploy to production. We use default inputs where possible, but you may need to confirm project settings.
npx vercel --prod

echo ">>> Deployment Complete."
