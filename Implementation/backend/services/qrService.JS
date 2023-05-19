const registerEvent = require("../models/registerEventModel");
const Booking = require("../models/bookingModel");


const getevent = async (req, res) => {
    const id = req.params.id;

    const booking = await registerEvent.find({ bookid: id });

    booking
    ? res.status(201).json(booking)
    : res.status(400).json({ message: "Booking not found" });
};

const getbooking = async (req, res) => {
    const id = req.params.id;

    const booking = await Booking.find({ bid: id });

    booking
    ? res.status(201).json(booking)
    : res.status(400).json({ message: "Booking not found" });
};



module.exports = {
    getevent,
    getbooking
};

