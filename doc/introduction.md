An extension of Node's readline `Interface` with asynchronicity.

#### Description
Instantiates a readline `Interface` (RLI) with the following additional features:

- `rl.spawnAsyncProcess()` - Spawns a new child process within the RLI to asynchronously run a given command. Leaves the event loop unblocked but with the appearance of running synchronously. I.e., the user cannot enter input (e.g., commands) during the process, but can terminate the process with `^C` and return to the RLI. In contrast, Node's default RLI blocks the event loop, requiring the user to externally kill the entire RLI process.

- `rl.setCommands()` - Assigns commands for the RLI to parse and execute. Automatically implements `tab` autocompletion for the command names.

- Automatically removes older history lines that duplicate new ones.

- Listens for `^C` (`SIGINT`) in the input stream to confirm exiting the RLI.

#### Usage
```javascript
// Instantiate a readline `Interface`.
var rl = require('readline-async')

// Assign commands to the RLI, executed via `.command`.
rl.setCommands({
  benchmark: function (numRuns) {
    // Run 'benchmark.js' as an asynchronous child process (the user can terminate).
    rl.spawnAsyncProcess('node', [
      './benchmark.js',
      '--num-runs=' + (numRuns || 1),
    ])
  },
  echo: function (string) {
    console.log(string)
  }
})

// Ready RLI for input and display the beautiful prompt character.
rl.prompt()

// Listen for when the user hits `return` or `enter`.
rl.on('line', function (line) {
  // Unimplemented.

  rl.prompt()
})
```