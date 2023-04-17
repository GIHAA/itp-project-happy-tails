const Joi = require('joi');
const report = require('../models/healthModel');
const pet = require('../models/petModel');
const { validateReport } = require('../validations/vetValidation')


const addReport = (async (req, res) => {

  console.log(req.body)
  // Validate the request body
  const { error } = validateReport(req.body);
  if (error)
    return res.status(400).json({ error: error.details[0].message });

  // Validate the petId exists in the pet and health collection
  const petProfile = await pet.findOne({ petId: req.body.petId });
  const reportOne = await report.findOne({ petId: req.body.petId });
  if (!petProfile)
    return res.status(400).json({ error: 'Invalid petId' });

  if (reportOne)
    return res.status(400).json({ error: 'Already Exsists' });


  // Create a new health report
  const newReport = new report({
    petId: req.body.petId,
    currentHealthStatus: req.body.currentHealthStatus,
    vaccinations: req.body.vaccinations

  });

  // Save the health report to the database
  newReport.save()
    .then(() => {
      // Respond with success message
      res.status(201).json({ message: 'Report Saved' });
    })
    .catch((err) => {
      // Log the error
      console.log(err);
      // Respond with an error message
      res.status(500).json({ error: 'Failed to save report due' });
    })
});



//--------------------update Report-----------------------
const reportUpdate = async (req, res) => {

  const { pid, currentHealthStatus, vaccinations, index } = req.body;
  // console.log(currentHealthStatus)

  // console.log(req.body)

  // Validate the request body
  // const { error } = validateReport(req.body);
  // if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    // Ensure the report belongs to the petId
    const reportData = await report.findOne({ petId: pid });
    console.log(reportData)
    if (!reportData) return res.status(404).json({ error: 'Report not found' });
    // Update the report
    await report.updateOne(
      {
        petId: pid,
        "vaccinations._id": vaccinations[index]._id
      },
      {
        $set: {
          "vaccinations.$.name": vaccinations[index].name,
          "vaccinations.$.dateGiven": vaccinations[index].dateGiven,
          "vaccinations.$.expirationDate": vaccinations[index].expirationDate,
          currentHealthStatus: currentHealthStatus
        }
      }
    );



    // Return success response
    res.status(200).json({ message: 'Report updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


//-----------------get one pet Report ------------------------------

const getReport = (async (req, res) => {

  const { id } = req.params;
  let petReport = null;

  try {
    petReport = await report.findOne({ petId: id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: 'Internal server error'
    });
  }
  // check if profile exists
  if (!petReport) {
    return res.status(404).json({
      error: 'Profile not found'
    });
  }
  res.status(200).json({ petReport })
})

//-------------------delete report------------------------
const deleteReport = (async (req, res) => {

  const { id } = req.params;
  try {
    // Check if the profile exists
    const deletedreport = await report.findOne({ petId: id });
    if (!deletedreport) {
      return res.status(404).json({ error: 'profile not found' });
    }
    // Delete the profile
    await report.findOneAndDelete({ petId: id });

    return res.status(200).json({ message: 'profile deleted successfully', deletedreport });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

//-------------------get all profiles---------------------

const getallReport = (async (req, res) => {
  try {
    // get all the profile 
    const petReport = await report.find();
    // return the profile
    res.status(200).json({ petReport });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//--------------------Add new Vac-----------------------
const addVac = async (req, res) => {
  const { id } = req.params;
  const { petId, currentHealthStatus, vaccinations } = req.body;
  console.log("add vac called")

  console.log(req.body)

  // Validate the request body
  // const { error } = validateReport(req.body);
  // if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    // Ensure the report belongs to the petId
    const reportData = await report.findOne({ petId: id });
    if (!reportData) return res.status(404).json({ error: 'Report not found' });

    // Update the report
    await report.updateOne(
      { petId: id },
      {
        $set: { currentHealthStatus: currentHealthStatus },
        $push: { vaccinations: { $each: vaccinations } }
      }
    );

    // Return success response
    res.status(200).json({ message: 'Report updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


//--------------------Delete exsisting Vac-----------------------
const deleteVac = async (req, res) => {
  const { id, index } = req.params;

  try {
    // Ensure the report belongs to the petId
    const reportData = await report.findOne({ petId: id });
    if (!reportData) return res.status(404).json({ error: 'Report not found' });

    // Get the vaccination object at the specified index
    const vaccination = reportData.vaccinations[index];
    console.log(vaccination)

    // Remove the specified element from the vaccinations array
    reportData.vaccinations.splice(index, 1);

    // Update the report
    await report.updateOne(
      { petId: id },
      { vaccinations: reportData.vaccinations }
    );

    // Return success response
    res.status(200).json({ message: 'Vaccination Deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


//-------------healthstatus count-----------------

const statusCount = async (req, res) => {
  try {
    const normalCount = await report.countDocuments({ currentHealthStatus: 'Normal' });
    const criticalCount = await report.countDocuments({ currentHealthStatus: 'Critical' });
    res.json({ normalCount, criticalCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error getting pet counts' });
  }
}




module.exports = { addReport, reportUpdate, getReport, deleteReport, getallReport, addVac, deleteVac, statusCount }
