#! /usr/bin/bash
#node-sass下载有问题，需要镜像

npm config set registry http://registry.npm.taobao.org
npm config set sass-binary-site http://npm.taobao.org/mirrors/node-sass

yarn config set registry http://registry.npm.taobao.org
yarn config set sass-binary-site http://npm.taobao.org/mirrors/node-sass

yarn config set sass_binary_site http://cdn.npm.taobao.org/dist/node-sass -g
