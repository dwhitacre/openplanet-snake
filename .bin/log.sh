#!/usr/bin/env bash

function log() {
  if [[ "$#" -eq 0  || "$#" -gt 2 ]]; then return
  fi

  local color=$1
  local text=$2

  local esc="\e["
  local reset="${esc}39m"
  
  local black="${esc}30m"
  local red="${esc}31m"
  local green="${esc}32m"
  local yellow="${esc}33m"
  local blue="${esc}34m"
  local magenta="${esc}35m"
  local cyan="${esc}36m"
  local lightgrey="${esc}37m"
  local darkgrey="${esc}90m"
  local lightred="${esc}91m"
  local lightgreen="${esc}92m"
  local lightyellow="${esc}93m"
  local lightblue="${esc}94m"
  local lightmagenta="${esc}95m"
  local lightcyan="${esc}96m"
  local white="${esc}97m"

  case ${color} in
    "black") color=${black}
      ;;
    "red") color=${red}
      ;;
    "green") color=${green}
      ;;
    "yellow") color=${yellow}
      ;;
    "blue") color=${blue}
      ;;
    "magenta") color=${magenta}
      ;;
    "cyan") color=${cyan}
      ;;
    "lgrey") color=${lightgrey}
      ;;
    "dgrey") color=${darkgrey}
      ;;
    "lred") color=${lightred}
      ;;
    "lgreen") color=${lightgreen}
      ;;
    "lyellow") color=${lightyellow}
      ;;
    "lblue") color=${lightblue}
      ;;
    "lmagenta") color=${lightmagenta}
      ;;
    "lcyan") color=${lightcyan}
      ;;
    "white") color=${white}
      ;;
    *) echo -ne "${red}Unknown text color:${reset}"
      ;;
  esac

  echo -e "${color}${text}${reset}"
}