#! /usr/local/bin/bash

cd ${BASE_DIR}/ms-dbms

npx sequelize db:drop

npx sequelize db:create
