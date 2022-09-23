#!/bin/bash

if [[ -z "$1" ]]; then
   # make sure if local device
   if [[ $"{expr substr ${uname} 1 6}" == "Darwin" ]]; then
      # echo "run on MacOS"
      server_ip=${ifconfig en0|grep "inet "|awk '{print $2}'|awk -F: '{print $1}'}
   elif [[ $"{expr substr ${uname -s} 1 5}" == "Linux" ]]; then
      server_ip=${ifconfig eth0|grep "inet addr"|awk '{print $2}'|awk -F: '{print $2}'}
   elif [[ $"{expr substr ${uname -s} 1 10}" == "MINGW32_NT" ]]; then
      echo "run on WinOS, need basnet-http server ip"
   fi
   port=8080
else
   server_ip="$1"
   port=$2
fi

echo "basnet-http server ip: ${server_ip}"

python3.7 src/main.py \
    --basnet_service_host="basnet-http.default.example.com" \
    --photoshop_password 123456 \
    --basnet_service_ip="http://"${server_ip}":${port}"
