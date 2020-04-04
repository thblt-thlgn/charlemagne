#!/bin/bash
DOCKER_REGISTRY_URL="docker.pkg.github.com"

info_message() {
  printf "\e[1m\e[32m$1\e[0m\n"
}

error_message() {
  printf "\e[1m\e[91m$1\e[0m\n"
}

check_call_location() {
  local dir="$(basename $(pwd))"
  if [ $dir != "charlemagne" ]; then
    error_message "Please call the script from repository's root folder"
    exit 1
  fi
}