#!/bin/bash

set -e # Exit on error

set -x # Print commands

set -u # Error on unset variables

set -o pipefail # Error on command pipe fail

git pull

docker compose build

docker compose down

docker compose up -d

docker compose logs -f