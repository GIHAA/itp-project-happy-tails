const Joi = require('joi');
const pet = require('../models/petModel');



function validateReport(report) {
  const schema = Joi.object({
    petId: Joi.string().required(),
    currentHealthStatus: Joi.string().required(),
    vaccinations: Joi.array().items(Joi.object({
      name: Joi.string().required(),
      dateGiven: Joi.date().required(),
      expirationDate: Joi.date().required(),
    })),
  });

  return schema.validate(report);
}

module.exports = {validateReport}