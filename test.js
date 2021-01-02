const puppeteer = require('puppeteer');
const fs = require('fs');
const jobs_controller = require('./controllers/annonce.controller');
const searchIndeed = require('./searchIndeed');
const searchMonster = require('./searchMonster');
const searchWomen = require('./searchWomen');

const webScarping=async () => {
    try {
        const browser = await puppeteer.launch();
        const data = fs.readFileSync('website.txt', 'utf8');
        const urls = data.split(/\r?\n/);
        const dataK = fs.readFileSync('keyWords.txt', 'utf8');
        const keywords = dataK.split(/\r?\n/);

        const sites = urls.map(async (url, i) => {
            switch (url) {
                case 'https://www.indeed.jobs':


                    for await (const l of keywords) {

                        const page = await browser.newPage();
                      await  searchIndeed(l,url,page)
                        .then(results => {
                           console.log('Done');
                        });
                
                    };

                    break;
                case 'https://www.monster.com':
                    for await (const l of keywords) {

                        const page = await browser.newPage();
                        await  searchMonster(l,url,page)
                        .then(results => {
                           console.log('Done');
                        });
                    };

                    break;




                case 'https://remotewoman.com':
                    for await (const l of keywords) {

                        const page = await browser.newPage();
                        await  searchWomen(l,url,page)
                        .then(results => {
                           console.log('Done');
                        });
                       
                    };


                    break;
                default:
                    console.log(`Sorry ${url}.`);
            }

        });

        Promise.all(sites).then(() => {
       
            browser.close();

        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = webScarping;