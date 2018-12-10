#!/bin/bash

if ! [ $(which phantomjs) ]; then
	sudo curl --output phantomjs https://s3.amazonaws.com/circle-downloads/phantomjs-2.1.1
fi

sudo cp -r phantomjs /usr/local/bin/phantomjs

sudo chmod ugo+x /usr/local/bin/phantomjs
