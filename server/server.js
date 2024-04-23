const express = require('express'); 
const apiRouter = require('../src/router/apiRouter'); 
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();

// CORS 
app.use(cors());


//  Middle Ware
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname+'/public'));

// ROUTER for API 

app.use(apiRouter); 

const PORT = process.env.SERVER_PORT || 8080; 

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});

module.exports = app; 