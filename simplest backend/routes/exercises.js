//REQUIRE EXPRESS ROUTER FEATURE AND CREATE AN INSTANCE OF EXERCISE MODEL
const router = require('express').Router();//import router function of express
let Exercise = require('../models/exercise.model');// import exercise model

//DEFINE RESPONSE TO 'GET' REQUESTS
router.route('/').get((req, res) => {//handling of GET requests
  Exercise.find()//get list of all exercises from the server
    .then(exercises => res.json(exercises))//return exercise data in JSON format
    .catch(err => res.status(400).json('Error: ' + err));
});

//DEFINE RESPONSE TO 'POST' REQUESTS
router.route('/add').post((req, res) => {//handling of POST requests
    //COLLECT RELEVANT REQUEST DATA POINTS
  const username = req.body.username; //get the username from the request (req) body 
  const description = req.body.description;//get the description from the request (req) body 
  const duration = Number(req.body.duration);//get the duration from the request (req) body 
  const date = Date.parse(req.body.date);//get the date from the request (req) body 

    //USE THEM TO CREATE AN INSTANCE OF EXERCISE MODEL
  const newExercise = new Exercise({ //create a new instance of exercise
    username,// populate username = username
    description,// populate username = username
    duration,// populate username = username
    date,// populate username = username
  });

  //SAVE THE EXERCISE TO THE DATABASE AND SEND CONFIRMATORY MESSAGE TO SERVER
  newExercise.save()//save the new exercise
  .then(() => res.json('Exercise added!'))//return JSON message: "Exercise added!"
  .catch(err => res.status(400).json('Error: ' + err));// catch errors
});

module.exports = router;//make the route accessible 