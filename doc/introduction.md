An asynchronous readline interface for Node.js.

#### Description
Instantiates a readline `Interface` (RLI) with the following additional features:

- `rl.spawnAsyncProcess()` - Spawns a new child process within the RLI to asynchronously run a given command. Leaves the event loop unblocked but with the appearance of running synchronously. I.e., the user cannot enter input (e.g., commands) during the process, but can terminate the process with `^C` and return to the RLI. In contrast, Node's default RLI blocks the event loop, requiring the user to externally kill the entire RLI process.

- `rl.addCommands()` - Registers commands for the RLI to parse and execute. Automatically implements `tab` autocompletion for the command names.

- `rl.onLine()` - Assigns a function to invoke when the user hits `return` or `enter`, and the input is not a registered command.

- Automatically removes older history lines that duplicate new ones.

- Listens for `^C` (`SIGINT`) in the input stream and prompts the user to confirm before exiting the RLI.

#### Installation
```shell
npm install dannynemer/dantil
```

#### Usage
```js
// Instantiate a readline `Interface`.
var rl = require('readline-async')

// Register commands, executed via `.command`.
rl.addCommands({
  name: 'echo',
  description: 'Write arguments to the standard output.',
  func: function (string) {
    console.log(string)
  }
}, {
  name: 'exit',
  description: 'Terminate RLI.',
  func: function (string) {
    rl.close()
  }
})

// Listen for when the user hits `return` and the input is not a registered command.
rl.onLine(function (line) {
  console.log('Unrecognized command:', line)
})

// Ready input and display the beautiful prompt character.
rl.prompt()
```