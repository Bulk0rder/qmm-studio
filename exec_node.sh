#!/bin/bash
export NODE_HOME=$PWD/node-v20.10.0-darwin-arm64
export PATH=$NODE_HOME/bin:$PATH
"$@"
