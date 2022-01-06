#!/bin/bash

# determine_chrome_version
# taken directly from CircleCI script to install ChromeDriver
if uname -a | grep Darwin> /dev/null 2>&1; then
  echo "System detected as MacOS"
  CHROME_VERSION="$(/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --version)"
else
  CHROME_VERSION="$(google-chrome --version)"
fi

CHROME_VERSION_STRING="$(echo $CHROME_VERSION | sed 's/^Google Chrome //' | sed 's/^Chromium //')"

# print Chrome version
echo "Installed version of Google Chrome is $CHROME_VERSION_STRING"

CHROMEDRIVER_RELEASE="${CHROME_VERSION_STRING%%.*}"

echo "ChromeDriver $CHROMEDRIVER_RELEASE will be installed"

# install chromedriver version synced to the chrome version
npm install --no-save "chromedriver@$CHROMEDRIVER_RELEASE"