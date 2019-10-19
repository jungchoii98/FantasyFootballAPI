const Joi = require('joi');
const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    pickNumber: {
        type: Number,
        required: true
    }
});

const Company = mongoose.model('Company', companySchema);

function validateCompany(company) {
    // const schema = {
    //     name: Joi.string().min(3).required()
    // };
    // return Joi.validate(Company, schema);
    return 1;
}

exports.companySchema = companySchema;
exports.Company = Company;
exports.validate = validateCompany;