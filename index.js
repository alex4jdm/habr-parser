const Parser = require('./src/parser');
const MongoClient = require("mongodb").MongoClient;
const cfg = require('./config.json');

const mongoClient = new MongoClient(cfg.uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoClient.connect(async (err, client) => {
    const scraper = new Parser(cfg.domain);
    await scraper.init(client, cfg.dbname);
    await scraper.startScrapper();
    //setTimeout(async () => { await scraper.stop(); }, 10000);
});