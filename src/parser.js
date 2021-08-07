const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const mongodb = require('mongodb');

class Parser {
    constructor(domain) {
        this.url = domain;
    }

    async init(MongoClient, dbname) {
        this.client = MongoClient;
        this.db = this.client.db(dbname);
        this.browser = await puppeteer.launch({headless: false});
        this.page = await this.browser.newPage();
        this.page.goto(this.url, { waitUntil: 'networkidle2' });
    }

    async startScrapper() {
        
    }
}

module.exports = Parser;