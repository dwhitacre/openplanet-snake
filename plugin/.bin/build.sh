#!/usr/bin/env bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
source "$SCRIPT_DIR/log.sh"
source "$SCRIPT_DIR/watch_fs.sh"

log "lgrey" "Loaded scripts from the directory $SCRIPT_DIR"

ROOT_DIR="$(git rev-parse --show-toplevel)/plugin"
SRC_DIR="$ROOT_DIR/src"
INFO_TOML="$ROOT_DIR/info.toml"
PLUGINS_DIR=${PLUGINS_DIR:-$HOME/OpenplanetNext/Plugins}
ZIP=${ZIP:-"$PROGRAMFILES/7-Zip/7z.exe"}

PLUGIN_PRETTY_NAME="$(cat $INFO_TOML | dos2unix | grep '^name' | cut -f 2 -d '=' | tr -d '\"\r' | sed 's/^[ ]*//')"
PLUGIN_VERSION="$(cat $INFO_TOML | dos2unix | grep '^version' | cut -f 2 -d '=' | tr -d '\"\r' | sed 's/^[ ]*//')"
PLUGIN_NAME=$(echo "$PLUGIN_PRETTY_NAME" | tr -d '(),:;'\''"' | tr 'A-Z ' 'a-z-')
PLUGIN_BUILD_DIR="$ROOT_DIR/dist"
PLUGIN_BUILD_NAME="$PLUGIN_BUILD_DIR/$PLUGIN_NAME-$PLUGIN_VERSION.op"
PLUGIN_DIRTY_FLAG="$PLUGIN_BUILD_DIR/dirty"

WATCH=false
CI=false
POSITIONAL_ARGS=()

while [[ $# -gt 0 ]]; do
  case $1 in
    -w|--watch)
      WATCH=true
      shift
      ;;
    --ci)
      CI=true
      shift
      ;;
    -*|--*)
      log "red" "Unknown option $1. Exiting."
      exit 1
      ;;
    *)
      POSITIONAL_ARGS+=("$1")
      shift
      ;;
  esac
done

set -- "${POSITIONAL_ARGS[@]}"

function publish() {
  if ! $CI; then
    local busy=true
    log "lgrey" "Waiting to publish when not busy.. Stop/Unload the plugin."
    while $busy; do
      cp $PLUGIN_BUILD_NAME $PLUGINS_DIR 2> /dev/null && busy=false
      sleep 1
    done
    log "green" "Copied build to plugins directory: $PLUGINS_DIR"
  fi
}

function publish_repeat() {
  while [[ true ]]; do
    publish
    watch_fs $PLUGIN_DIRTY_FLAG
  done
}

function build() {
  log "white" "Running build script for plugin: $PLUGIN_PRETTY_NAME v$PLUGIN_VERSION"

  if ! test -d $PLUGIN_BUILD_DIR; then
    mkdir $PLUGIN_BUILD_DIR
  fi

  if test -f $PLUGIN_BUILD_NAME; then
    rm -f $PLUGIN_BUILD_NAME
  fi

  "$ZIP" a -mx1 -tzip $PLUGIN_BUILD_NAME $INFO_TOML $SRC_DIR
  log "lgreen" "Build complete: $PLUGIN_BUILD_NAME"
  echo "$(date)" > $PLUGIN_DIRTY_FLAG
}

build
if $WATCH; then
  publish_repeat &
  while [[ true ]]; do
    watch_fs $SRC_DIR
    build
  done
else
  publish &
fi

if ps -p $! > /dev/null; then
  wait $!
fi