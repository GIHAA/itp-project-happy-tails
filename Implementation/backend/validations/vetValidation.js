const Joi = require('joi');



// Validate the request body

function  validateRegReqBody(req) {
const schema = Joi.object({
    petName: Joi.string().required(),
    species: Joi.string().required(),
    breed: Joi.string().required(),
    gender: Joi.string().required(),
    age: Joi.string().required(),
    size: Joi.string().required(),
    color: Joi.string().required(),
    petStatus: Joi.string().required()

  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

}

module.exports = {validateRegReqBody}