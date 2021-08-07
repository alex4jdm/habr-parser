const Parser = require('./src/parser');
const mongoClient = require("mongodb").MongoClient;

const cfg = require('config.json');
const scraper = new Parser(cfg.domain);

mongoClient.connect(function(err, client){
    scraper.init(client, cfg.dbname);
    const collection = db.collection("users");
    let user = {name: "Tom", age: 23};
    collection.insertOne(user, function(err, result){
          
        if(err){ 
            return console.log(err);
        }
        console.log(result.ops);
        client.close();
    });
});