#!/usr/bin/env bash

lerna clean -y

find . -name "yarn.lock" -exec rm {} \;
find . -name "yarn-error.log" -exec rm {} \;
find . -name "package-lock.json" -exec rm {} \;

lerna bootstrap
