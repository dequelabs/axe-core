var fs = require('fs-extra')

if (fs.existsSync(".git/hooks")) {
	let commitMsg = '.git/hooks/commit-msg'
	if (!fs.existsSync(commitMsg)) {
		let angularPrecommit = "./node_modules/angular-precommit/index.js"
		if (fs.existsSync(angularPrecommit)) {
			fs.copy(angularPrecommit, commitMsg, (err) => {
				if (err) throw err
				console.log("Installing git pre-commit hook")
			})
		}
	}
}