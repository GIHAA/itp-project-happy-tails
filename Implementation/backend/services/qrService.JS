// const registerEvent = require("../models/registerEventModel");
// const event = require("../models/eventModel");

// const getevent = async (req, res) => {
//     const id = req.params.id;

//     try {
//         const booking = await registerEvent.findOne({ bookid: id });
//         const Event = await event.findOne({})

//         if (booking) {
//             const html = `
//                 <html>
//                     <head>
//                         <title>Booking Details</title>
//                         <link rel="stylesheet" href="https://unpkg.com/tailwindcss/dist/tailwind.min.css">
//                     </head>
//                     <body class="bg-gray-200">
//                         <div class="container mx-auto py-10">
//                             <h1 class="text-3xl font-bold mb-5">Booking Details</h1>
//                             <div class="bg-white shadow-lg p-5">
//                                 <p class="text-lg font-semibold"><strong>Booking ID:</strong> ${booking.bookid}</p>
//                                 <p class="text-lg font-semibold"><strong>Name:</strong> ${booking.name}</p>
//                                 <p class="text-lg font-semibold"><strong>Email:</strong> ${booking.email}</p>
//                                 <p class="text-lg font-semibold"><strong>Event Name:</strong> ${booking.eventname}</p>
//                                 <p class="text-lg font-semibold"><strong>Event Date:</strong> ${booking.eventdate}</p>
//                             </div>
//                         </div>
//                     </body>
//                 </html>
//             `;
//             res.status(200).send(html);
//         } else {
//             res.status(404).send("<h1>Booking not found</h1>");
//         }
//     } catch (err) {
//         console.error(err);
//         res.status(500).send("<h1>Internal Server Error</h1>");
//     }
// };

// module.exports = {
//     getevent,
// };

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

