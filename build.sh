#!/bin/bash

cd android
./gradlew assembleRelease

# Copy to dropbox
cp app/build/outputs/apk/release/app-release.apk ~/Dropbox/Android/PlayServer/.

cd ..