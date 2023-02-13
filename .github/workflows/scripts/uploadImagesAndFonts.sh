#!/bin/bash
echo "Uploading images and fonts..."
rm dist/demo.html dist/*.min.js dist/*.map dist/*.common.js
cd dist
find * -type f > assets.list

while IFS="" read -r file || [ -n "$file" ]
do
    curl -u ${{ secrets.CDN_UPLOAD_USER }}:${{ secrets.CDN_UPLOAD_SECRET }} --upload-file $file https://apps.intension.eu/nexus/repository/vidis-cdn-snapshots/current-version-suffix/$file;
    curl -u ${{ secrets.CDN_UPLOAD_USER }}:${{ secrets.CDN_UPLOAD_SECRET }} --upload-file assets.list https://apps.intension.eu/nexus/repository/vidis-cdn-snapshots/current-version-suffix/
done < assets.list