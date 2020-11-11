#!/usr/bin/env bash

hash surge || exit 1
yarn clean
yarn build
cp dist/index.html dist/200.html
surge dist mp3.ngobach.com