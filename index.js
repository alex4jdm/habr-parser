const Parser = require('./src/parser');
const MongoClient = require("mongodb").MongoClient;
const cfg = require('./config.json');

const scraper = new Parser(cfg.domain);

const mongoClient = new MongoClient(cfg.uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoClient.connect((err, client) => {
    scraper.init(client, cfg.dbname);
    const collection = client.db(cfg.dbname).collection("articles");

});