#!/bin/bash

npm run build
cd dist
ossutil cp -r -f static oss://willdata/huiyi/production/static/
mv ./index.html ../../huiyizhan/src/main/webapp/templates/fed/mobile.html
cd -
