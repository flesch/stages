# stages

This is a small utility to parse the `Accept` header into an array of "stages", allowing a client to opt-in to functionality, like [GitHub uses in the GraphQL API](https://developer.github.com/v4/previews/).

### Install

```shell
$ npm install --save stages
```

### Usage

#### `stages(acceptHeaderString, regexPattern)`

**stages** accepts two arguments: the `Accept` header string, and a pattern to match against.

```js
const stages = require('stages');

const accept = '*/*,application/vnd.github.antiope-preview+json,application/vnd.github.echo-preview+json';
const pattern = /application\/vnd\..*\.(.*)\+json/;

console.log(stages(accept, pattern)); // ==> ['antiope-preview', 'echo-preview']
```

Use **stages** in an Express app:

```diff
  const express = require('express');
+ const stages = require('stages');
  const app = express();
+ app.use((req, res, next) => {
+   req.stages = stages(req.headers.accept, /application\/vnd\..*\.(.*)\+json/);
+   next();
+ });
  app.get('/', (req, res, next) => {
-   return res.send('Hello');
+   if (req.stages.includes('echo-preview')) {
+     return res.send(`The <code>echo-preview</code> stage is enabled!`);
+   }
+   res.send(req.stages.length ? `The stages enabled are: ${req.stages.join(', ')}` : `No stages are enabled!`);
  });
  app.listen(3000);
+ // curl --header "Accept: application/vnd.github.echo-preview+json" http://localhost:3000/
```
