#!/bin/bash
echo "Uploading images and fonts..."
find * -type f > assets.list

while IFS="" read -r file || [ -n "$file" ]
do
    curl -v -u ${{ secrets.CDN_UPLOAD_USER }}:${{ secrets.CDN_UPLOAD_SECRET }} --upload-file $file https://fwu-nexus.intension.eu/repository/vidis-cdn-snapshots/current-version-suffix/$file;
done < assets.list