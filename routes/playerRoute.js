const {Player, validate} = require('../models/player');
const {Company} = require('../models/company');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// gets players in ascending order of name
router.get('/', async (req, res) => {
    const player = await Player.find().sort('name');
    res.send(player);
});

// add a player to database
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // const company = await Company.findById(req.body.id);
    // if(!company) return res.status(400).send('Invalid company.');

    let player = new Player({
        name: req.body.name,
        team: req.body.team,
        position: req.body.position,
        company: [
            {
                name: req.body.company[0].name,
                pickNumber: req.body.company[0].pickNumber
            },
            {
                name: req.body.company[1].name,
                pickNumber: req.body.company[1].pickNumber
            }
        ],
    });
    player = await player.save();
    res.send(player);
});

// update a player
router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const company = await Company.findById(req.body.id);
    if(!company) return res.status(400).send('Invalid company.');

    const player = await Player.findByIdAndUpdate(req.params.id,
        {
            name: req.body.name,
            team: req.body.team,
            position: req.body.position,
            company: {
                _id: company._id,
                name: company.name
            },
        }, { new: true });
    if(!player) return res.status(404).send('The player with given ID was not found.');
    res.send(player);
});

// delete a player from database
router.delete('/:id', async (req, res) => {
    const player = await Player.findByIdAndRemove(req.params.id);
    
    if(!player) return res.status(404).send('The player with the given ID was not found.');
    res.send(player);
});

// get a specific player from database
router.get('/:id', async (req, res) => {
    const player = await Player.findById(req.params.id);

    if(!player) return res.status(404).send('The player with the given ID was not found.');
    res.send(player);
});

module.exports = router;