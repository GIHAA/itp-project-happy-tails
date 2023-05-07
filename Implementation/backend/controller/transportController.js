const asyncHandler = require("express-async-handler");
const Transport = require("../models/transportModel");

const addTransport = asyncHandler(async (req, res) =>{    
    const { userName, plocation, dlocation, petType, date, time, count, selectedVehicle , phone  } = req.body
    const transport = await Transport.create({
        userName,
        plocation,
        dlocation,
        petType,
        date,
        time,
        count,
        selectedVehicle,
        phone,
        status : 'PENDING'
        
    })
    transport ? res.status(201).json(transport) : res.status(400).json({message: 'Booking not created'})
})

/*const readTransport = asyncHandler(async (req, res) => {
  const pendingBookings = await Transport.find({ status: 'PENDING' });
  const acceptedBookings = await Transport.find({ status: 'ACCEPTED', acceptedBy: { $ne: null } });
  const rejectedBookings = await Transport.find({ status: 'REJECTED' });
  res.json({ pendingBookings, acceptedBookings, rejectedBookings });
});*/

//get
const readTransport = asyncHandler(async (req, res) =>{

  const transport = await Transport.find({})
  res.json(transport)
})


const updateTransport = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { userName, plocation, dlocation, petType, date, time, count, selectedVehicle,status } = req.body;
  const transport = await Transport.findByIdAndUpdate(id, {
    userName,
    plocation,
    dlocation,
    petType,
    date,
    time,
    count,
    selectedVehicle,
    status 
  }, { new: true });
  transport ? res.status(200).json(transport) : res.status(400).json({ message: 'Booking not updated' });
});




const deleteTransport = asyncHandler(async (req, res) =>{
    const id = req.params.id
    const transport = await Transport.findByIdAndDelete(id)
    transport ? res.status(200).json(transport) : res.status(400).json({message: 'Booking not deleted'})
})


const assignVehicle = asyncHandler(async (req, res) => {
  const selectedPlateNo = req.body.selectedPlateNo;

  const transport = await Transport.findOneAndUpdate({ plateNo: selectedPlateNo }, { status: 'assigned' }, { new: true });

  res.json(transport);
});



const getCount = asyncHandler(async (req, res) => {
  const pendingCount = await Transport.countDocuments({ status: "PENDING" });
  const acceptedCount = await Transport.countDocuments({ status: "ACCEPTED" });
  res.json({ pendingCount, acceptedCount });
});

module.exports = {
  addTransport,
  readTransport,
  updateTransport,
  deleteTransport,
  assignVehicle,
  getCount,
};
