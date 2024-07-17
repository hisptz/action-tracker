
# Get app version from package.json
APP_VERSION=$(node -p "require('./package.json').version")
APP_NAME=$(node -p "require('./package.json').name")


# Build the app
ng build --configuration production --aot

# Bundle the app
cd dist/action-tracker
zip -r -D $APP_NAME-$APP_VERSION.zip .
