var docdown = require('docdown')
var fs = require('fs')
var package = require('../package.json')

// Generate 'README.md' from JSDoc.
fs.writeFileSync('../README.md', docdown({
	path: '../' + package.main,
	// Remove leading 'git+' and trailing '.git' from repository url.
	url: package.repository.url.slice(4, -4) + '/blob/master/' + package.main,
	title: package.name,
	// Load README introduction from 'introduction.md'.
	description: fs.readFileSync('./introduction.md', 'utf8'),
	sort: false,
}))