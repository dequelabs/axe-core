tag=${git tag --format "%(refname:short) %(creatordate:short)" | tail -n1 | awk '{print$1}'};
date=${git tag --format "%(refname:short) %(creatordate:short)" | tail -n1 | awk '{print$2}'};


generate_version_files () {
        mkdir $tag;
	git checkout tags/$tag -b master; mkdir $tag;
	npm install;
	npm run build;
	for axe.js $tag/; mv axe.min.js $tag/;
        npm run build --lang=ja;
        mv axe.js $tag/axe.ja.js; mv axe.min.js $tag/axe.ja.min.js;
}

create_release_json () {
        echo "{" >> release.json; echo "    \"version\": \"$tag\"," >> release.json;
	echo "    \"releaseDate\": \"$date\"," >> release.json;
	echo "    \"releaseNotesUrl\": \"https://github.com/dequelabs/axe-core/releases/tag/$tag\"," >> release.json;
	echo "    \"template\": \"standardTemplatesWcag21_ja.json\"" >> release.json;
	echo "}" >> release.json
	cp release.json release_ja.json;
	mv release.json $tag/;
	mv release_ja.json $tag/;
}

tar -zcvf axe-core-$tag.tar.gz $tag/;
