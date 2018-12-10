#!/bin/bash

if ! [ $(which phantomjs) ]; then
	sudo curl --output /usr/local/bin/phantomjs https://s3.amazonaws.com/circle-downloads/phantomjs-2.1.1
fi

sudo chmod ugo+x /usr/local/bin/phantomjs
