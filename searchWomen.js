const jobs_controller = require('./controllers/annonce.controller');


const searchWomen =async function searchWomen(l,url,page) {

  console.log(`loading page: ${url}`);
  await page.goto(url, {
      waitUntil: 'networkidle0',
      timeout: 120000,
  });
  console.log(`saving : ${url}`);
  console.log(l);

  //Finds input element with name attribue 'q' and types searchQuery

  const searchResults = await page.$$eval('ul[class="job_listings"]', results => {
      //Array to hold all our results
      let data = [];

      results.forEach(result => {
          //Target the title
          const jobName = result.querySelector('li>div[class="job_listing-about"]>div>h3')
              .innerText;

          //Target the url
          const url = result.querySelector('li>a').href;

          //Target the jobDescription

          const jobDescription = result.querySelector('li>div[class="job_listing-about"]>div>div[class="job_listing-company"]>span')
              .innerText;

          //Target the dateJob
          const date=new Date();
          const dateJob= date.toISOString()

          //Add to the return Array
          data.push({ jobName, url, jobDescription, dateJob });
      });



      //Return the top results
      return data;
  });
  jobs_controller.create_job(searchResults)
  console.log(`closing page: ${url}`);
  await page.close();
    };
    
  


module.exports = searchWomen;