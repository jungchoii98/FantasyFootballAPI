const Joi = require('joi');
const mongoose = require('mongoose');
const {companySchema} = require('./company');

const Player = mongoose.model('Player', new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    team: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    company: {
        type: [companySchema],
        required: true
    }
}));


function validatePlayerData(player) {
    // const schema = {
    //     name: Joi.string().min(1).required()
    // };
    // return Joi.validate(player, schema);
    return 1;
 }

 exports.Player = Player;
 exports.validate = validatePlayerData;