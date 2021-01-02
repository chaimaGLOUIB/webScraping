const jobs_controller = require('./controllers/annonce.controller');

const searchIndeed = async function indeed(l,url,page) {
  
  console.log(`loading page: ${url}`);
  await page.goto(url, {
      waitUntil: 'networkidle0',
      timeout: 120000,
  });
  console.log(`saving : ${url}`);
  console.log(l);
  await page.type('input[name="search"]', l);

  //Finds an input with name 'btnK', after so it executes .click() DOM Method
  await page.$eval('button[name="action"]', button => button.click());
  //Wait for one of the div classes to load
  await page.waitForSelector('ul[class="listSingleColumn"]');

  //Find all div elements with class 'g'. These divs contain the information we need
  const searchResults = await page.$$eval('li[class="listSingleColumnItem"]', results => {
      //Array to hold all our results
      let data = [];
      results.forEach(result => {
          //Target the title
          const jobName= result.querySelector('h3> a').innerText;
          //Target the url
          const url = result.querySelector('h3> a').href;
          const jobDescription=result.querySelector('h3> a').innerText;
          const date=new Date();
          const dateJob= date.toISOString();
          //Add to the return Array
          data.push({ jobName, url, jobDescription,dateJob });

      });
      //Return the top results
      return data;
  });
  jobs_controller.create_job(searchResults)
  await page.close();

  console.log(`closing page: ${url}`);

}

module.exports = searchIndeed;