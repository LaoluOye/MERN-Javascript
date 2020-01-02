//REQUIRE EXPRESS CORS MONGOOSE DOTENV
const express = require('express'); //import  express
const cors = require('cors');//import CORS
const mongoose = require('mongoose');//import mongoose

require('dotenv').config(); //import dotenv configuration 

//CONFIGURE APP(EXPRESS INSTANCE) AND ACCESS PORT
const app = express(); //crate an instance of express called app
const port = process.env.PORT || 5000; //set up the port (5000) using process.env

//ENABLE CCORS ANF EXPRESS JSON
app.use(cors()); //allow the app to use CORS
app.use(express.json()); //allow the app to use express json


//CONNECT TO MONGODB DATABASE
const uri = process.env.ATLAS_URI; //load ATLAS_URI from .env file to the apps environment
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

//REQUIRE EXERCISES AND USERS ROUTES AND ENABLE INSTANCE IN LOCAL FOLDER
const exercisesRouter = require('./routes/exercises');//allow server to access exercises route 
const usersRouter = require('./routes/users');//allow server to access users route

app.use('/exercises', exercisesRouter); //allow app(instance of express) to use exercises route with local folder file?
app.use('/users', usersRouter); //allow app(instance of express) to use users route with local folder file?

app.listen(port, () => { 
    console.log(`Server is running on port: ${port}`); //set up the server to listen and print a message to confirm
});