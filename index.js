const mongoose = require('mongoose');
const companies = require('./routes/companyRoute');
const players = require('./routes/playerRoute');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/fantasyAPI',{useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/companies', companies);
app.use('/api/players', players);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));