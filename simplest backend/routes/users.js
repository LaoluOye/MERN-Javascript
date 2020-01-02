//REQUIRE EXPRESS ROUTER AND CREATE AN INSTANCE OF USER MODEL
const router = require('express').Router();// import express router function as router
let User = require('../models/user.model'); //instantiate a user.model object 

//DEFINE HANDLING OF 'GET' REQUESTS
router.route('/').get((req, res) => { //handling of 'GET' requests...(req body is empty here; so returns all)
  User.find()// fetches list of all users from the database
    .then(users => res.json(users))//return exercise data in JSON format
    .catch(err => res.status(400).json('Error: ' + err));// catch error
});

//DEFINE HANDLING OF POST REQUESTS
router.route('/add').post((req, res) => {//handling of POST requests
    //GET USERNAME DATA DOINT FORM REQUEST JSON MESSAGE. USE IT TO CREATE AN INSTANCE OF USER MODEL: NEWUSER 
  const username = req.body.username;//get username from the request (req)
  const newUser = new User({username}); //create an instance of User with username = username

  //SAVE THE NEW USER TO THE DATABASE AND RETURN JSON CONFIRMATORY MESSAGE
  newUser.save()//save the new user
    .then(() => res.json('User added!'))//return json with message: User added!
    .catch(err => res.status(400).json('Error: ' + err)); //catch errors
});

module.exports = router; //make the router accessible by other parts of the app