#!/bin/bash

npm run build
cd dist
ossutil64.exe cp -r -f static oss://willdata/huiyi/production_dev/static/
mv index.html mobile.html
# cd -
