# readline-async

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
  benchmark: function (numRuns) {
    // Run 'myBenchmark.js' as asynchronous child process (the user can terminate).
    rl.spawnAsyncProcess('node', [
      './myBenchmark.js',
      '--num-runs=' + (numRuns || 1),
    ])
  },
  echo: function (string) {
    console.log(string)
  }
})

// Listen for when the user hits `return` and the input is not a registered command.
rl.onLine(function (line) {
  console.log('Unrecognized command:', line)
})

// Ready input and display the beautiful prompt character.
rl.prompt()
```

<!-- div class="toc-container" -->

<!-- div -->

## `rl`
* <a href="#rl-spawnAsyncProcess">`rl.spawnAsyncProcess`</a>
* <a href="#rl-addCommands">`rl.addCommands`</a>
* <a href="#rl-onLine">`rl.onLine`</a>

<!-- /div -->

<!-- /div -->

<!-- div class="doc-container" -->

<!-- div -->

## `rl`

<!-- div -->

### <a id="rl-spawnAsyncProcess"></a>`rl.spawnAsyncProcess(command, args, [stdio=[ 'ignore', process.stdout, process.stderr ]], [callback])`
<a href="#rl-spawnAsyncProcess">#</a> [&#x24C8;](https://github.com/DannyNemer/readline-async/blob/master/readlineAsync.js#L70 "View in source") [&#x24C9;][1]

Spawns a new process within the readline `Interface` (RLI) to asynchronously run `command` with `args`.
<br>
<br>
Executes `command` as an asynchronous child process, leaving the event loop unblocked, but with the appearance of running synchronously. I.e., the user cannot enter input (e.g., commands) during the process, but can terminate the process with `^C` and return to the RLI. In contrast, Node's default RLI blocks the event loop, requiring processes to complete before accepting any input; i.e., the user must externally kill the entire RLI process.
<br>
<br>
Temporarily disables the RLI's `stdio` (input and output) while the child is processing, except for `^C` (`SIGINT`) to terminate the child. Restores the RLI `stdio` when the child exits or terminates.

#### Arguments
1. `command` *(string)*: The command to run as a child process.
2. `args` *(string&#91;&#93;)*: The command line arguments for `command`.
3. `[stdio=[ 'ignore', process.stdout, process.stderr ]]` *(string|Array)*: The optional child process's `stdio` configuration.
4. `[callback]` *(Function)*: The optional function to execute after the child process exits and before returning control to the RLI.

#### Returns
*(ChildProcess)*:  Returns the spawned `ChildProcess`.

#### Example
```js
rl.addCommands({
  benchmark: function (numRuns) {
    // Run 'myBenchmark.js' as asynchronous child process (the user can terminate).
    rl.spawnAsyncProcess('node', [
      './myBenchmark.js',
      '--num-runs=' + (numRuns || 1),
    ])
  }
})
```
```
❯ .benchmark
...executing stuff in 'myBenchmark.js'...
...
→ user sends `^C` from command line
Error: Child process terminated due to receipt of signal SIGINT
❯
```
* * *

<!-- /div -->

<!-- div -->

### <a id="rl-addCommands"></a>`rl.addCommands(commands)`
<a href="#rl-addCommands">#</a> [&#x24C8;](https://github.com/DannyNemer/readline-async/blob/master/readlineAsync.js#L169 "View in source") [&#x24C9;][1]

Registers `commands` for the RLI to parse and execute. Automatically implements `<tab>` autocompletion for the command names.
<br>
<br>
Commands are executed in the RLI with a leading period followed by the command name: `.command`. Commands are passed all arguments that follow the command name.

#### Arguments
1. `commands` *(Object)*: The functions the RLI will parse and execute.

#### Example
```js
rl.addCommands({
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

<!-- div -->

### <a id="rl-onLine"></a>`rl.onLine(func)`
<a href="#rl-onLine">#</a> [&#x24C8;](https://github.com/DannyNemer/readline-async/blob/master/readlineAsync.js#L194 "View in source") [&#x24C9;][1]

Assigns a function to invoke when the user hits `return` or `enter` and the input is not a registered command (set by `rl.addCommands()`).

#### Arguments
1. `func` *(Function)*: The function invoked per RLI input that is not a registered command. Passed the input line as the only argument.

#### Example
```js
// Listen for when the user hits `return` and the input is not a registered command.
rl.onLine(function (line) {
  console.log('Unrecognized command:', line)
})
```
* * *

<!-- /div -->

<!-- /div -->

<!-- /div -->

 [1]: #rl "Jump back to the TOC."
