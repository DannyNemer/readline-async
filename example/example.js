// Instantiate a readline `Interface`.
var rl = require('../')

// Register commands, executed via `.command`.
rl.addCommands({
  name: 'test',
  description: 'Run \'exampleChild.js\' as terminable asynchronous child process.',
  func: function () {
    rl.spawnAsyncProcess('node', [ './exampleChild.js' ])
  }
}, {
  name: 'echo',
  argNames: [ '<string>' ],
  description: 'Write <string> to the standard output.',
  func: function (string) {
    console.log(string || '')
  }
}, {
  name: 'exit',
  description: 'Terminate RLI.',
  func: function () {
    rl.close()
  }
})

// Listen for when the user hits `return` and the input is not a registered command.
rl.onLine(function (line) {
  console.log('Thank you for your input:', line)
})