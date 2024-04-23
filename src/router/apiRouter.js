const express = require('express'); 
const db = require('../../db');
const app = express()

const apiRouter = express.Router(); 

// get all of the comic 
apiRouter.get('/api/comic/', async (req,res,next) => {
  try{
    let results = await db.all(); 
    let episodes = [] 
    episodes[0] = results
    res.json(episodes); 
  }
  catch(e){
    console.log(e); 
    res.sendStatus(500);
  }
}); 

// get episode title 
apiRouter.get('/api/comic/episode/:id', async (req,res,next) => {
  try{
    let results = await db.one(req.params.id); 
    res.json(results); 
  }
  catch(e){
    console.log(e); 
    res.sendStatus(500);
  }
});

// GET All Pages based on episode id 
apiRouter.get('/api/comic/episode/pages/:id', async (req,res,next) => {
  try{
    let results = await db.some(req.params.id); 
    res.json(results); 
  }
  catch(e){
    console.log(e); 
    res.sendStatus(500);
  }
});


// get latest episode 
apiRouter.get('/api/comic/episode/latest', async (req,res,next) => {
  // res.json({test: "test"});
  try
  {
    let results = await db.latest();
    let latestEpisode = []; 
    latestEpisode[0] = results; 
    console.log("API ROUTER LATEST ==V"); 
    console.log(latestEpisode); 
    res.json(latestEpisode); 
  }
  catch(e)
  {
    console.log(e); 
    res.sendStatus(500);
  }
});

module.exports = apiRouter; 