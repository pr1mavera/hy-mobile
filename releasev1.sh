#!/bin/bash

npm run build
cd dist
mv index.html mobile.html
ossutil64.exe cp -r -f static oss://willdata/huiyi/production/static/
# mv ./index.html ../../huiyizhan/src/main/webapp/templates/fed/mobile.html
# cd -
