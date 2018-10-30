const express = require('express');
const stages = require('stages');

const app = express();

app.use((req, res, next) => {
  req.stages = stages(req.headers.accept, /application\/vnd\..*\.(.*)\+json/);
  next();
});

app.get('/', (req, res, next) => {
  if (req.stages.includes('preview')) {
    return res.send(`The <code>preview</code> stage is enabled!`);
  }
  return res.send(req.stages.length ? `The stages enabled are: ${req.stages.join(', ')}` : `No stages are enabled!`);
});

app.listen(3000, () => {
  console.log(`Server running at http://localhost:3000/`);
  console.log('  > curl --header "Accept: application/vnd.github.echo-preview+json" http://localhost:3000/');
});
