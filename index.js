const Parser = require('./src/parser');

const miner = new Parser('https://habr.com/');
miner.start();