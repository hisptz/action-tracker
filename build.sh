#! /usr/bin/bash
# Get app version from package.json
APP_VERSION=$(node -p "require('./package.json').version")


# Build the app
ng build --configuration production --aot

# Bundle the app
cd dist/action-tracker
zip -r -D action-tracker-$APP_VERSION.zip .
