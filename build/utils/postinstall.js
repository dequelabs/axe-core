var fs = require('fs')

if (fs.existsSync(".git/hooks")) {
	let commitMsg = '.git/hooks/commit-msg'
	if (!fs.existsSync(commitMsg)) {
		let angularPrecommit = "./node_modules/angular-precommit/index.js"
		if (fs.existsSync(angularPrecommit)) {
			var fsExtra = require('fs-extra')
			fsExtra.copy(angularPrecommit, commitMsg, (err) => {
				if (err) throw err
				console.log("Installing git pre-commit hook")
			})
		}
	}
}