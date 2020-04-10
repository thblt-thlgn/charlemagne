#!/bin/bash

# LOAD DEPENDANCIES
source $(dirname $0)/utils.sh
check_call_location

AUTHENTICATION_KEY_DIR=$(pwd)/micro-services/authentication/assets/keys
MESSAGING_KEY_DIR=$(pwd)/micro-services/messaging/assets/keys

mkdir -p $AUTHENTICATION_KEY_DIR
mkdir -p $MESSAGING_KEY_DIR

ssh-keygen -t rsa -b 4096 -m PEM -f $AUTHENTICATION_KEY_DIR/private.key
openssl rsa -in $AUTHENTICATION_KEY_DIR/private.key -pubout -outform PEM -out $AUTHENTICATION_KEY_DIR/public.key
ln -s $AUTHENTICATION_KEY_DIR/public.key $MESSAGING_KEY_DIR/authentication.pub.key