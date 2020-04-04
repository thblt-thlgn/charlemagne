#!/bin/bash

# LOAD DEPENDANCIES
source $(dirname $0)/utils.sh
check_call_location

AUTH_KEY_DIR=$(pwd)/micro-services/authentication/assets/keys

mkdir -p $AUTH_KEY_DIR

ssh-keygen -t rsa -b 4096 -m PEM -f $AUTH_KEY_DIR/private.key
openssl rsa -in $AUTH_KEY_DIR/private.key -pubout -outform PEM -out $AUTH_KEY_DIR/public.key
