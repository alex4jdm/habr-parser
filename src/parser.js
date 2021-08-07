const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

class Parser {
    constructor(domain) {
        this.url = domain;
    }

    async start() {
        this.browser = await puppeteer.launch({headless: false});
        this.page = await this.browser.newPage();
        this.page.goto(this.url, { waitUntil: 'networkidle2' });
    }
}

module.exports = Parser;