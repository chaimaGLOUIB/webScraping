const express = require('express');
const app = express();
const port = 4000;
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const MONGODB_URL="mongodb+srv://ChaimaGLOUIB:Chaima1997@cluster0.oy5vl.gcp.mongodb.net/<indeedWomen>?retryWrites=true&w=majority"

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(MONGODB_URL,
     {  useNewUrlParser:true,
          useUnifiedTopology: true });

mongoose.connection.on('connected', ()=>{
    console.log('Mongoose is connected');
})

const webScraping = require('./test');



        webScraping()
            .then(results => {
               console.log('Start');
            });
    
    


//Catches requests made to localhost:3000/


//Initialises the express server on the port 30000
app.listen(port, () => console.log(`App listening on port ${port}!`));
