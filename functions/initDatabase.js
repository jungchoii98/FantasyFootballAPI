const {Player} = require('../models/player');
const mongoose = require('mongoose');
const express = require('express');
var fs = require('fs');

mongoose.connect('mongodb://localhost/fantasyAPI',{useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// convert json file to an array of objects
var fileContent = fs.readFileSync("../PlayerData.json");
let json = JSON.parse(fileContent);

// inserts all of the players in the json file
async function createPlayers(players) {
    Player.insertMany(players, function(error, docs) {});
}

// inserts all of the companies
async function createCompanies(companies) {

}

createPlayers(json);