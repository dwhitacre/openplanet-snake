#!/usr/bin/env bash

function watch_fs() {
  if [[ "$#" -eq 0  || "$#" -gt 1 ]]; then return
  fi

  local dir=$1
  local chsum1=""

  log "white" "Watching $dir for changes..."

  while [[ true ]]; do
    chsum2="$(find "$dir" -type f -exec md5sum {} \;)"
    if [[ $chsum1 != $chsum2 ]] ; then           
      if [ -n "$chsum1" ]; then
        return
      fi
      chsum1=$chsum2
    fi
    sleep 1
  done
}
