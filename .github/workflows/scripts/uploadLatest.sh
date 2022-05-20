#!/bin/bash
echo "Uploading images and fonts to latest..."
cd dist
find * -type f > assets.list

while IFS="" read -r file || [ -n "$file" ]
do
    curl -u ${{ secrets.CDN_UPLOAD_USER }}:${{ secrets.CDN_UPLOAD_SECRET }} --upload-file $file https://fwu-nexus.intension.eu/repository/vidis-cdn-snapshots/current-version-suffix/$file;
    curl -u ${{ secrets.CDN_UPLOAD_USER }}:${{ secrets.CDN_UPLOAD_SECRET }} --upload-file assets.list https://fwu-nexus.intension.eu/repository/vidis-cdn-snapshots/current-version-suffix/
done < assets.list