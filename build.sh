#!/bin/bash

bun install
python3 fix_dependency.py
bun run build
echo "website built"

if [ "$1" = "-d" ]; then
    sudo cp -rf dist/* /var/www/html
    echo "website deployed"
fi

