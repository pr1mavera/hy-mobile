#!/bin/bash

npm run build
cd dist
mv index.html mobile.html
ossutilmac64 cp -r -f static oss://willdata/huiyi/production/static/
cd -
