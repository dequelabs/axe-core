/// <reference path="axe-core.d.ts" />

var context:any = document
var $fixture:any = {}

// axe.a11yCheck config
axe.a11yCheck(context, {}, (results) => {
	console.log(results.violations.length)
});
// axe.a11yCheck include/exclude
axe.a11yCheck({include: [['#id1'], ['#id2']]}, {}, (results) => {
	console.log(results)
})
axe.a11yCheck({exclude: [$fixture[0]]}, {}, (results) => {
	console.log(results)
})
var tagConfig = {
	runOnly: {
		type: 'tag',
		values: ['wcag2a']
	}
}
axe.a11yCheck(context, tagConfig, (results) => {
	console.log(results)
})
var includeExcludeTagsConfig = {
	runOnly: {
		type: 'tags',
		value: {
			include: ['wcag2a', 'wcag2aa'],
			exclude: ['experimental']
		}
	}
}
axe.a11yCheck(context, includeExcludeTagsConfig, (results) => {
	console.log(results)
})
var someRulesConfig = {
	rules: {
		"color-contrast": {enabled: 'false'},
		"heading-order": {enabled: 'true'}
	}
}
axe.a11yCheck(context, someRulesConfig, (results) => {
	console.log(results)
})

// axe.configure
var spec = {
	branding: {
		brand: 'foo',
		application: 'bar'
	},
	reporter: 'v1',
	checks: [{
		id: 'custom-check',
		evaluate: function() {
			return true
		}
	}],
	rules: [{
		id: 'custom-rule',
		any: ['custom-check']
	}]
}
axe.configure(spec)

axe.reset()

axe.getRules(['wcag2aa'])
typeof axe.getRules() === 'object'

// Plugins
var pluginSrc = {
	id: 'doStuff',
	run: (data:any, callback:Function) => {
		callback()
	},
	commands: [{
		id: 'run-doStuff',
		callback: (data:any, callback:Function) => {
			axe.plugins['doStuff'].run(data, callback)
		}
	}]
}
axe.registerPlugin(pluginSrc)
axe.cleanup()