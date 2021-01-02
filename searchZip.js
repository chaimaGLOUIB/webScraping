const fs = require('fs');
const readline = require('readline');
const puppeteer = require('puppeteer');


const searchGoogl =async function processLineByLine() {
  const websiteFile = fs.createReadStream('website.txt');

  const rl = readline.createInterface({
    input: websiteFile,
    crlfDelay: Infinity
  });
  const keyWordsFile = fs.createReadStream('keywords.txt');

  const rlk = readline.createInterface({
    input: keyWordsFile,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    for await (const l of rlk) {
      // Each line in website.txt will be successively available here as `line`.
      console.log(`Line from file: ${line}`);

    
        const browser = await puppeteer.launch();

        const page = await browser.newPage();
        
        await page.goto( line, {
            waitUntil: 'load',
            // Remove the timeout
            timeout: 0
        });

        //Finds input element with name attribue 'search' and types searchQuery
        await page.$eval('input[name=search]', (el, _l) => el.value = _l, l,
        'input[name=location]',e => e.value = 'USA');

        await page.$eval('input[type="submit"]', button => button.click());

        //Wait for one of the div classes to load
        await page.waitForSelector('div[class="inner salary_chart_ab"]');

        const searchResults = await page.$$eval('div[class=job_content]', results => {
          //Array to hold all our results
          let data = [];

          results.forEach(result => {
            
            //Target the url
            const url = result.querySelector(' div[job_title_and_org] > a').href;

            //Target the description

            //Add to the return Array
            data.push({url});
          });
         

        //Return the top results
        return data;
      });

      await browser.close();

      return searchResults;
    };
    
  
}
}

module.exports = searchGoogl;