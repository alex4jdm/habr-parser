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

    async stop() {
        await this.browser.close();
    }

    async startScrapper() {
        try {
            const tasks = this.db.collection('tasks');
            tasks.findOne(async (err, doc) => {
                await this.page.goto(doc.url, { waitUntil: 'networkidle2' });
                const content = await this.page.content();
                let $ = cheerio.load(content);
                let article = {
                    url: doc.url,
                    header: '',
                    hubs: [],
                    labels: []
                };

                // Getting header
                $('#app > div.tm-layout__wrapper > div.tm-layout > main > div > div > div > div.tm-page__main.tm-page__main_has-sidebar > div > div.tm-page-article__body > article > div.tm-page-article__head-wrapper > div > h1')
                .each((i, element) => {
                    article.header = $(element);
                });

                // Getting hubs
                $('#app > div.tm-layout__wrapper > div.tm-layout > main > div > div > div > div.tm-page__main.tm-page__main_has-sidebar > div > div.tm-page-article__body > article > div.tm-page-article__head-wrapper > div > div.tm-article-snippet__hubs > span')
                .each((i, element) => {
                    article.hubs.push($(element).text());
                });

                // Getting labels
                $('#app > div.tm-layout__wrapper > div.tm-layout > main > div > div > div > div.tm-page__main.tm-page__main_has-sidebar > div > div.tm-page-article__body > article > div.tm-page-article__head-wrapper > div > div.tm-article-snippet__labels > span')
                .each((i, element) => {
                    article.labels.push($(element).text());
                });
            });
        } catch (error) {
            console.log('You should use init method.' + error);
        }
    }
}

module.exports = Parser;