#!/usr/bin/env bash

set -eo pipefail

mongoimport --db ms-auth --collection accounts --file ./accounts.json

# TODO
moreusers=<<__EOF__

__EOF__

cat ${moreusers} | mongoimport --db ms-auth --collection accounts
