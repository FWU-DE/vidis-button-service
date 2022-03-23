#!/bin/bash
echo "Downloading images..."
mkdir img
cd img
wget -4 --user ${{ secrets.CDN_UPLOAD_USER }} --password ${{ secrets.CDN_UPLOAD_SECRET }} -r -np -nH "https://fwu-nexus.intension.eu/repository/vidis-cdn-snapshots/current-version-rc/img/"

echo "Downloading fonts..."
cd ..
mkdir fonts
cd fonts
wget -4 --user ${{ secrets.CDN_UPLOAD_USER }} --password ${{ secrets.CDN_UPLOAD_SECRET }} -r -np -nH "https://fwu-nexus.intension.eu/repository/vidis-cdn-snapshots/current-version-rc/fonts/"