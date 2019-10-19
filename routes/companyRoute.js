const {Company, validate} = require('../models/company');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router()

// receive all companies
router.get('/', async (req, res) => {
    const companies = await Company.find().sort('name');
    res.send(companies);
});

// post a new company to database
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let company = new Company({name: req.body.name, pickNumber: req.body.pickNumber});
    company = await company.save();

    res.send(company);
});

// update company in database
router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const company = await Company.findByIdAndUpdate(req.params.id, {name: req.body.name, pickNumber: req.body.pickNumber}, {
        new: true
    });

    if(!company) return res.status(404).send('The company with the given ID was not found.');
    res.send(company);
});

// delete company from database
router.delete('/:id', async (req, res) => {
    const company = await Company.findByIdAndRemove(req.params.id);

    if(!company) return res.status(404).send('The company with the given ID was not found.');
    res.send(company);
});

// get company with specific id
router.get('/:id', async (req, res) => {
    const company = await Company.findById(req.params.id);
    if(!company) return res.status(404).send('The company with the given ID was not found.');
    res.send(company);
});

module.exports = router;

