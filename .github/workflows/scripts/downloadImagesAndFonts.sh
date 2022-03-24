#!/bin/bash
mkdir dist
cd dist
curl -u ${{ secrets.CDN_UPLOAD_USER }}:${{ secrets.CDN_UPLOAD_SECRET }} -O https://fwu-nexus.intension.eu/repository/vidis-cdn-snapshots/current-version-rc/assets.list

while IFS="" read -r file || [ -n "$file" ]
do
    curl -u ${{ secrets.CDN_UPLOAD_USER }}:${{ secrets.CDN_UPLOAD_SECRET }} --create-dirs -o $file https://fwu-nexus.intension.eu/repository/vidis-cdn-snapshots/current-version-rc/$file;
done < assets.list