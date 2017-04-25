import * as axe from '../../axe'

var context:any = document
var $fixture:any = {}

axe.run(context, {}, (error: Error, results: axe.AxeResults) => {
	if (error) {
		console.log(error);
	}
	console.log(results.passes.length);
	console.log(results.incomplete.length);
	console.log(results.inapplicable.length);
	console.log(results.violations.length);
	console.log(results.violations[0].nodes[0].failureSummary)
});
axe.run().then(function(done:any) {
	done();
});
// additional configuration options
axe.run(context, {iframes: false, selectors: false, elementRef: false}, (error: Error, results: axe.AxeResults)  => {
	console.log(results.passes.length);
});

// axe.a11yCheck config
axe.a11yCheck(context, {}, (results: axe.AxeResults) => {
	// axe's results object
	console.log(results.passes.length)
	console.log(results.violations.length)
});
// axe.a11yCheck include/exclude
axe.a11yCheck({include: [['#id1'], ['#id2']]}, {}, (results: axe.AxeResults) => {
	console.log(results)
})
axe.a11yCheck({exclude: [$fixture[0]]}, {}, (results: axe.AxeResults) => {
	console.log(results)
})
// additional configuration options
axe.a11yCheck(context, {iframes: false, selectors: false, elementRef: false}, (results: axe.AxeResults)  => {
	console.log(results.passes.length);
});
var tagConfigRunOnly: axe.RunOnly = {
	type: 'tag',
	values: ['wcag2a']
}
var tagConfig = {
	runOnly: tagConfigRunOnly
}
axe.a11yCheck(context, tagConfig, (results: axe.AxeResults) => {
	console.log(results)
})
var includeExcludeTagsRunOnly: axe.RunOnly = {
	type: 'tags',
	value: {
		include: ['wcag2a', 'wcag2aa'],
		exclude: ['experimental']
	}
}
var includeExcludeTagsConfig = {
	runOnly: includeExcludeTagsRunOnly
}
axe.a11yCheck(context, includeExcludeTagsConfig, (results: axe.AxeResults) => {
	console.log(results)
})
var someRulesConfig = {
	rules: {
		"color-contrast": {enabled: 'false'},
		"heading-order": {enabled: 'true'}
	}
}
axe.a11yCheck(context, someRulesConfig, (results: axe.AxeResults) => {
	console.log(results)
})

// axe.configure
var spec: axe.Spec = {
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

var source = axe.source;

axe.reset()

axe.getRules(['wcag2aa'])
typeof axe.getRules() === 'object'

// Plugins
var pluginSrc: axe.AxePlugin = {
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
