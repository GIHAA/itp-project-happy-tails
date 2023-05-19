const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Userpets = require("../models/userPetModel");

const get = asyncHandler(async (req, res) => {
  const userpets = await Userpets.find({ cus_id: req.params.id });

  userpets
    ? res.status(201).json(userpets)
    : res.status(400).json({ message: "Error" });
});

const add = asyncHandler(async (req, res) => {
  const { cus_id, pet_id } = req.body;

  const userpets = await Userpets.create({
    cus_id,
    pet_id,
  });

  userpets
    ? res.status(201).json(userpets)
    : res.status(400).json({ message: "Error" });
});

const update = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { cus_id, pet_id } = req.body;

  const userpets = await Userpets.findOne({ _id: id });

  if (userpets) {
    // Update the userpets document with new values
    userpets.cus_id = cus_id || userpets.cus_id;
    userpets.pet_id = pet_id || userpets.pet_id;

    // Save the updated document and wait for it to complete
    await userpets.save();

    res.status(201).json(userpets);
  } else {
    res.status(400).json({ message: "Error" });
  }
});

const remove = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const userpets = await Userpets.findByIdAndDelete(id);

  userpets
    ? res.status(201).json(userpets)
    : res.status(400).json({ message: "Error" });
});

module.exports = {
  get,
  add,
  update,
  remove,
};
