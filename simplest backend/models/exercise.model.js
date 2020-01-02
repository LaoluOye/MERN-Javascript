// REQUIRE MONGOOSE AND CRETE AN INSTANCE: A SCHEMA
const mongoose = require('mongoose');//import mongoose
const Schema = mongoose.Schema; //instantiate a new schema


//DEFINE THE SCHEMA (JSON FORMAT)
const exerciseSchema = new Schema({//set up the schema (columns)
  username: { type: String, required: true },//set up username field
  description: { type: String, required: true },//set up description field
  duration: { type: Number, required: true }, //set up duration field
  date: { type: Date, required: true }, //set up date field
}, {
  timestamps: true, //keep timestamps e.g created, modified
});

//CREATE AN INSTANCE OF THE EXERCISESCHEMA AS EXCERCISE THEN MAKE IT ACCESSIBLE TO THE APP
const Exercise = mongoose.model('Exercise', exerciseSchema);// create an exercise instance
module.exports = Exercise; // make the exercise intance accessible to other parts of the app