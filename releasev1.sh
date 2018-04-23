#!/bin/bash

npm run build
cd dist
ossutilmac64 cp -r -f static oss://willdata/huiyi/production/static/
cd -

