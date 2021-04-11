#!/bin/bash
npm run build
echo 'password: wjy2020520...'
scp -r dist/*  root@119.29.183.88:/home/nginx/html/daohang/
echo 'Auto deployment is successful!'
