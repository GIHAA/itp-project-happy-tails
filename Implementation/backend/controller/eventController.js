const express = require("express");
const event = require("../models/eventModel");
const Joi = require("joi");
const mongoose = require("mongoose");

//add event
const addEvent = (req, res) => {
  // Destructure the request body
  const {
    eid,
    name,
    description,
    startTime,
    endTime,
    date,
    venue,
    price,
    status,
    image,
    size,
  } = req.body;

  // Create a new event
  const newevent = new event({
    eid,
    name,
    description,
    startTime,
    endTime,
    date,
    venue,
    price,
    status,
    image,
    size,
  });

  // Save the event to the database
  newevent
    .save()
    .then(() => {
      // Respond with success message
      res.status(201).json({ message: "Event added" });
    })
    .catch((err) => {
      // Log the error
      console.log(err);
      // Respond with an error message
      res.status(500).json({ error: "Failed to add event" });
    });
};

//get all profiles
const getEvents = async (req, res) => {
  try {
    // get all the events
    const allevents = await event.find();

    // return the events
    res.status(200).json({ allevents });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

//get one event

const getEvent = async (req, res) => {
  const { eventId } = req.params;
  let even = null;
  //validate event id
  if (!mongoose.Types.ObjectId.isValid(eventId)) {

    return res.status(400).json({
      error: "Invalid EVENT ID",
    });
  }

  try {
    even = await event.findById(eventId);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
  // check if event exists
  if (!even) {
    return res.status(404).json({
      error: "Event not found",
    });
  }
  res.status(200).json({ even });
};

// update event
const editEvent = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    startTime,
    endTime,
    date,
    venue,
    price,
    status,
    image,
    size,
  } = req.body;
  const updatedEventData = {
    name,
    description,
    startTime,
    endTime,
    date,
    venue,
    price,
    status,
    image,
    size,
  };

  // Validate the id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ error: "Invalid Event ID" });
  }

  // Validate the request body
  if (
    !name ||
    !description ||
    !startTime ||
    !endTime ||
    !date ||
    !venue ||
    !price ||
    !status ||
    !size
  ) {
    return res.status(400).send({ error: "Missing required fields" });
  }

  try {
    // Ensure the event belongs to the event manager making the request
    const even = await event.findById(id);
    if (!even) {
      return res.status(404).send({ error: "Event not found" });
    }

    // Update the event
    await event.findByIdAndUpdate(id, updatedEventData);

    // Return success response
    res.status(200).send({ status: "Event updated" });
  } catch (err) {
    console.log(`error:${err}`);
    res.status(500).send({ error: "Internal server error" });
  }
};

//delete event
const deleteEvent = async (req, res) => {
  try {
    //validate the id
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid event ID" });
    }

    // Check if the event exists
    const deletedEvent = await event.findById(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }
    // Delete the event
    await event.findByIdAndRemove(req.params.id);

    return res
      .status(200)
      .json({ message: "event deleted successfully", deletedEvent });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { addEvent, getEvents, getEvent, deleteEvent, editEvent };
