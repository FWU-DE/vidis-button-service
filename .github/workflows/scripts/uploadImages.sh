#!/bin/bash
echo "Uploading images..."
for file in dist/img/*
do
    curl -v -u ${{ secrets.CDN_UPLOAD_USER }}:${{ secrets.CDN_UPLOAD_SECRET }} --upload-file $file https://fwu-nexus.intension.eu/repository/vidis-cdn-snapshots/current-version-snapshot/img/;
done;

echo "Uploading fonts..."
for file in dist/fonts/*
do
    curl -v -u ${{ secrets.CDN_UPLOAD_USER }}:${{ secrets.CDN_UPLOAD_SECRET }} --upload-file $file https://fwu-nexus.intension.eu/repository/vidis-cdn-snapshots/current-version-snapshot/fonts/;
done;