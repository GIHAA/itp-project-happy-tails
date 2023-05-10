const joi = require("@hapi/joi");
var { Schema } = require("../validations/cusDonaValidation");
var { Orgschema } = require("../validations/cusDonaValidation");
var { Transchema } = require("../validations/cusDonaValidation");
var { CusPay } = require("../validations/cusDonaValidation");

//user payment validation

const paymentValidation = async (req, res, next) => {
  const value = CusPay.validate(req.body);
  if (value.error) {
    res.json({
      success: 0,
      message: value.error.details[0].message,
    });
  } else {
    next();
  }
};

//user donation validation

const addUserValidation = async (req, res, next) => {
  const value = Schema.validate(req.body);
  if (value.error) {
    res.json({
      success: 0,
      message: value.error.details[0].message,
    });
  } else {
    next();
  }
};

//organization donations validation

const orgValidation = async (req, res, next) => {
  const value = Orgschema.validate(req.body);
  if (value.error) {
    res.json({
      success: 0,
      message: value.error.details[0].message,
    });
  } else {
    next();
  }
};

//Transaction validation

const transferValidation = async (req, res, next) => {
  const value = Transchema.validate(req.body);
  if (value.error) {
    res.json({
      success: 0,
      message: value.error.details[0].message,
    });
  } else {
    next();
  }
};

module.exports = {
  transferValidation,
  orgValidation,
  addUserValidation,
  paymentValidation,
};
