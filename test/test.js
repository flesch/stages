const stages = require('..');
const assert = require('assert');

const accept = '*/*,application/vnd.github.antiope-preview+json,application/vnd.github.echo-preview+json';
const pattern = /application\/vnd\..*\.(.*)\+json/;

assert.deepStrictEqual(stages(accept, pattern), ['antiope-preview', 'echo-preview']);

console.log('  \x1b[32m✔︎\x1b[0m OK\n');
