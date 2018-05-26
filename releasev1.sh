#!/bin/bash

npm run build
cd dist
ossutil64.exe cp -r -f static oss://willdata/huiyi/production/static/
mv index.html mobile.html
# cd -
