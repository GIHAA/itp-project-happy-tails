const express = require("express");
const inExEvent = require("../models/eventAmountModel");
const Joi = require("joi");
const mongoose = require("mongoose");

//add income expenses of event
const addeamount = (req, res) => {
  // Destructure the request body
  const {
    eid,
    eventName,
    price,
    noOfTicket,
    totalIncome,
    totalExpense,
    result,
    rate,
  } = req.body;

  // Create a new event
  const newEventAmount = new inExEvent({
    eid,
    eventName,
    price,
    noOfTicket,
    totalIncome,
    totalExpense,
    result,
    rate,
  });

  // Save the income expenses of event to the database
  newEventAmount
    .save()
    .then(() => {
      // Respond with success message
      res.status(201).json({ message: "income expenses of event added" });
    })
    .catch((err) => {
      // Log the error
      console.log(err);
      // Respond with an error message
      res.status(500).json({ error: "Failed to add income expenses of event" });
    });
};

//get all income expenses of event
const geteamounts = async (req, res) => {
  try {
    // get all the income expenses of event
    const alleamount = await inExEvent.find();

    res.status(200).json({ alleamount });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

//delete income expenses of event
const deleteeamount = async (req, res) => {
  try {
    //validate the id
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json({ error: "Invalid income expenses of event ID" });
    }

    // Check if the income expenses of event exists
    const deleteeamount = await inExEvent.findById(req.params.id);
    if (!deleteeamount) {
      return res
        .status(404)
        .json({ error: "income expenses of event not found" });
    }
    // Delete the income expenses of event
    await inExEvent.findByIdAndRemove(req.params.id);

    return res.status(200).json({
      message: "income expenses of event deleted successfully",
      deleteeamount,
    });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

//get one income expenses of event

const geteamount = async (req, res) => {
  const { id } = req.params;
  let eamount = null;
  //validate income expenses of event id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.log(id);
    return res.status(400).json({
      error: "Invalid income expenses of event ID",
    });
  }

  try {
    eamount = await inExEvent.findById(id);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
  // check if income expenses of event exists
  if (!eamount) {
    return res.status(404).json({
      error: "income expenses of event not found",
    });
  }
  res.status(200).json({ eamount });
};

// update income expenses of event
const editeamount = async (req, res) => {
  const { id } = req.params;
  const {
    eid,
    eventName,
    price,
    noOfTicket,
    totalIncome,
    totalExpense,
    result,
    rate,
  } = req.body;
  const updatedEAmountData = {
    eid,
    eventName,
    price,
    noOfTicket,
    totalIncome,
    totalExpense,
    result,
    rate,
  };

  //   console.log(eid)
  //   console.log(eventName)
  //   console.log(noOfTicket)
  //   console.log(totalIncome)
  //   console.log(totalExpense)
  //   console.log(result)
  //   console.log(rate)
  //   console.log(price)
  // Validate the id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .send({ error: "Invalid income expenses of event ID" });
  }

  // Validate the request body
  // if(!eventName || !eid || !price || !noOfTicket || !totalIncome || !totalExpense || !result || !rate ){
  //     return res.status(400).send({ error: 'Missing fields' });
  // }
  try {
    // Ensure the income expenses of event belongs to the event manager making the request
    const eamount = await inExEvent.findById(id);
    if (!eamount) {
      return res
        .status(404)
        .send({ error: "income expenses of event not found" });
    }

    // Update the income expenses of event
    await inExEvent.findByIdAndUpdate(id, updatedEAmountData);

    // Return success response
    res.status(200).send({ status: "income expenses of event updated" });
  } catch (err) {
    console.log(`error:${err}`);
    res.status(500).send({ error: "Internal server error" });
  }
};

module.exports = {
  addeamount,
  geteamounts,
  deleteeamount,
  geteamount,
  editeamount,
};
