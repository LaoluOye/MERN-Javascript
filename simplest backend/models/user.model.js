//REQUIRE MONGOOS ENA DUSE IT TO INTANTIATE A NEW SCHEMA
const mongoose = require('mongoose');// import mongoose
const Schema = mongoose.Schema; //instantiate a new mongoose schema 

//DEFINE THE STRUCTURE OF THE SCHEMA
const userSchema = new Schema({ //define the schema
  username: {
    type: String,// string type
    required: true, //required field
    unique: true, //no repeatable only
    trim: true, // don't know what this is
    minlength: 3 // minimum character length
  },
}, {
  timestamps: true, //keep timestamps for created, modified, etc
});

//CREATE AND INSTANCE OF THE USERCHEMA: USER. MAKE IT AVAILABLE TO THE APP
const User = mongoose.model('User', userSchema); //create a new user
module.exports = User; //make user accessible by other parts of the app