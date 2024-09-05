#!/bin/bash
echo "Uploading images and fonts..."
rm dist/demo.html dist/*.min.js dist/*.map dist/*.common.js
cd dist
find * -type f > assets.list

while IFS="" read -r file || [ -n "$file" ]
do
    curl -u $CDN_UPLOAD_USER:$CDN_UPLOAD_SECRET --upload-file $file https://fwu-nexus.intension.eu/repository/vidis-cdn-snapshots/current-version-suffix/$file;
    curl -u $CDN_UPLOAD_USER:$CDN_UPLOAD_SECRET --upload-file assets.list https://fwu-nexus.intension.eu/repository/vidis-cdn-snapshots/current-version-suffix/
done < assets.list