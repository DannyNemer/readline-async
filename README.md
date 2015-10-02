# readline-async

An extension of Node's readline `Interface` with asynchronicity.
#### Description

Instantiates a readline `Interface` (RLI) with the following additional features:

- `rl.spawnAsyncProcess()` - Spawns a new child process within the RLI to asynchronously run a given command. Leaves the event loop unblocked but with the appearance of running synchronously. I.e., the user cannot enter input (e.g., commands) during the process, but can terminate the process with `^C` and return to the RLI. In contrast, Node's default RLI blocks the event loop, requiring the user to externally kill the entire RLI process.

- `rl.setCommands()` - Assigns commands for the RLI to parse and execute. Automatically implements `tab` autocompletion for the command names.

- Automatically removes older history lines that duplicate new ones.

- Listens for `^C` (`SIGINT`) in the input stream to confirm exiting the RLI.

#### Usage
```javascript
var rl = require('readline-async')

// Assign commands to the RLI, executed via `.command`.
rl.setCommands({
  benchmark: function (numRuns) {
    // Run 'benchmark.js' as an asynchronous child process (the user can terminate).
    rl.spawnAsyncProcess('node', [
      './benchmark.js',
      '--num-runs=' + (isNaN(numRuns) ? 1 : numRuns),
    ])
  },
  echo: function (string) {
    console.log(string)
  },
  exit: function () {
    rl.close()
  }
})

// Readies RLI for input and displays the beautiful prompt character.
rl.prompt()

// Listen for when the user hits `return` or `enter`.
rl.on('line', function (line) {
  // Unimplemented.

  rl.prompt()
})
```

<!-- div class="toc-container" -->

<!-- div -->

## `Methods`
* <a href="#rl-prototype-spawnAsyncProcess">`rl.prototype.spawnAsyncProcess`</a>
* <a href="#rl-prototype-setCommands">`rl.prototype.setCommands`</a>

<!-- /div -->

<!-- /div -->

<!-- div class="doc-container" -->

<!-- div -->

## `Methods`

<!-- div -->

### <a id="rl-prototype-spawnAsyncProcess"></a>`rl.prototype.spawnAsyncProcess(command, args, [stdio=[ 'ignore', process.stdout, process.stderr ]], [callback])`
<a href="#rl-prototype-spawnAsyncProcess">#</a> [&#x24C8;](https://github.com/DannyNemer/readline-async/blob/master/readline-async.js#L55 "View in source") [&#x24C9;][1]

Spawns a new process within the readline `Interface` (RLI) to asynchronously run `command` with `args`.
<br>
<br>
Executes `command` as an asynchronous child process, leaving the event loop unblocked, but with the appearance of running synchronously. I.e., the user cannot enter input (e.g., commands) during the process, but can terminate the process with `^C` and return to the RLI. In contrast, Node's default RLI blocks the event loop, requiring processes to complete before accepting any input (including `^C`). (Hence, the user must externally kill the entire RLI process.)
<br>
<br>
Disables the RLI's `stdio` (input and output) while the child is processing, except for `^C` (`SIGINT`) to terminate the child. Restores the RLI `stdio` when the child exits or terminates.

#### Arguments
1. `command` *(string)*: The command to run as a child process.
2. `args` *(string&#91;&#93;)*: The command line arguments for `command`.
3. `[stdio=[ 'ignore', process.stdout, process.stderr ]]` *(string|Array)*: The optional child process's `stdio` configuration.
4. `[callback]` *(Function)*: The optional function to execute after the child process exits and before returning control to the RLI.

#### Example
```js
rl.setCommands({
  benchmark: function (numRuns) {
    // Run 'benchmark.js' as an asynchronous child process (the user can terminate).
    rl.spawnAsyncProcess('node', [
      './benchmark.js',
      '--num-runs=' + (isNaN(numRuns) ? 1 : numRuns),
    ])
  }
})
```
```
❯ .benchmark
...executing stuff in benchmark.js...
...
→ user sends `^C` from command line
Error: Child process terminated due to receipt of signal SIGINT
❯
```
* * *

<!-- /div -->

<!-- div -->

### <a id="rl-prototype-setCommands"></a>`rl.prototype.setCommands(commands)`
<a href="#rl-prototype-setCommands">#</a> [&#x24C8;](https://github.com/DannyNemer/readline-async/blob/master/readline-async.js#L149 "View in source") [&#x24C9;][1]

Assigns `commands` for the RLI to parse as `.command` and execute. Automatically implements `tab` autocompletion for the command names.
<br>
<br>
Commands are executed in the RLI with a leading period followed by the command name: `.command`. Commands are passed all arguments that follow the command name.

#### Arguments
1. `commands` *(Object)*: The functions the RLI will parse and execute.

#### Example
```js
rl.setCommands({
  echo: function (string) {
    console.log(string)
  },
  exit: function () {
    rl.close()
  }
})
```
```
❯ <tab>
.echo  .exit

❯ .e → .ec<tab> → .echo → .echo hello
hello
```
* * *

<!-- /div -->

<!-- /div -->

<!-- /div -->

 [1]: #methods "Jump back to the TOC."
