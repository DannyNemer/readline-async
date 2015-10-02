var docdown = require('docdown')
var fs = require('fs')
var packageFile = require('../package.json')

fs.writeFileSync('../README.md', docdown({
	path: '../' + packageFile.main,
	url: packageFile.repository.url,
	toc: 'categories',
	sort: false,
	title: packageFile.name,
	description: [
		packageFile.description,
		'Instantiates a readline `Interface` (RLI) with the following additional features:',
		'',
		'- `rl.spawnAsyncProcess()` - Spawns a new process within the RLI to asynchronously run a given command. Leaves the event loop unblocked but with the appearance of running synchronously. I.e., the user cannot enter input (e.g., commands) during the process, but can terminate the process with `^C` and return to the RLI. In contrast, Node\'s default RLI blocks the event loop, requiring the user to externally kill the entire RLI process.',
		'',
		'- `rl.setCommands()` - Assigns commands for the RLI to parse and execute. Automatically implements `tab` autocompletion for the command names.',
		'',
		'- Automatically removes older history lines that duplicate new ones.',
		'',
		'- Listens for `^C` (`SIGINT`) in the input stream to confirm exiting the RLI.',
		'',
		'#### Usage',
		'```javascript',
		'var rl = require(\'readline-async\')',
		'```',
	].join('\n')
}))