var docdown = require('docdown')
var fs = require('fs')
var package = require('../package.json')

var repoRootPath = __dirname + '/../'

// Generate README from JSDoc.
fs.writeFileSync(repoRootPath + 'README.md', docdown({
	// Path of file to parse.
	path: repoRootPath + package.main,
	// Remove leading 'git+' and trailing '.git' from repository url.
	url: package.repository.url.slice(4, -4) + '/blob/master/' + package.main,
	// Heading title for README.
	title: package.name,
	// Load README introduction from 'introduction.md'.
	introduction: fs.readFileSync(__dirname + '/introduction.md', 'utf8'),
	// Organize methods by property.
	toc: 'properties',
	// Do not alphabetically sort functions and categories.
	sort: false,
}))