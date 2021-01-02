
const jobs_controller = require('./controllers/annonce.controller');

const searchMonster = async function Monster(l, url, page) {

  console.log(`loading page: ${url}`);
  await page.goto(url, {
    waitUntil: 'networkidle0',
    timeout: 120000,
  });
  console.log(`saving : ${url}`);
  console.log(l);

  //Finds input element with name attribue 'q' and types searchQuery

  await page.$eval('input[name=q]', (el, _l) => el.value = _l, l,
    'input[name=where]', e => e.value = 'USA');


  //Finds an input with name 'doQuickSearch', after so it executes .click() DOM Method
  await page.$eval('button[id="doQuickSearch"]', button => button.click());


  //Wait for one of the div classes to load
  await page.waitForSelector('div[id=SearchResults]');

  //Find all div elements with class 'summary'. These divs contain the information we need
  const searchResults = await page.$$eval('div[class=summary]', results => {
    //Array to hold all our results
    let data = [];

    results.forEach(result => {
      //Target the title

      const jobName = result.querySelector(' header> h2> a').innerText;

      //Target the url
      const url = result.querySelector(' header> h2> a').href;

      //Target the company

      const  jobDescription =result.querySelector(' header> h2> a').innerText;

      //Target the Location
      const date=new Date();
     const dateJob= date.toISOString()
      const salary='';

      console.log(dateJob);

      //Target the Date

      //Add to the return Array
      data.push({ jobName, url,salary,  jobDescription, dateJob});

    });


    //Return the top results
    return data;
  });

  jobs_controller.create_job(searchResults)
  await page.close();

  console.log(`closing page: ${url}`);

}

module.exports = searchMonster;