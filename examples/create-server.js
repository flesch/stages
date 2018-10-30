const { createServer } = require('http');
const stages = require('../');

const server = createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  const previews = stages(req.headers.accept, /application\/vnd\..*\.(.*)\+json/);
  if (previews.includes('echo-preview')) {
    return res.end(`The <code>echo-preview</code> stage is enabled!\n`);
  }
  return res.end(req.stages.length ? `The stages enabled are: ${req.stages.join(', ')}\n` : `No stages are enabled!\n`);
});

server.listen(3000, () => {
  console.log(`Server running at http://localhost:3000/`);
  console.log('  > curl --header "Accept: application/vnd.github.echo-preview+json" http://localhost:3000/');
});
