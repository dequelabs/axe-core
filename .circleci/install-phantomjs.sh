#!/bin/bash

if [ ! -e phantomjs ]; then
	# phantomjs cache does not exist, fetch phantomjs
  sudo curl --output phantomjs https://s3.amazonaws.com/circle-downloads/phantomjs-2.1.1
fi

# move phantomjs to bin
sudo cp -r phantomjs /usr/local/bin/phantomjs

# update permissions
sudo chmod ugo+x /usr/local/bin/phantomjs
