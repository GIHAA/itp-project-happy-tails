const report = require('../models/healthModel');
const pet = require('../models/petModel');



const addReport = (async (req, res) => {

  // Validate the petId exists in the pet and health collection
  const petProfile = await pet.findOne({ petId: req.body.petId });
  const reportOne = await report.findOne({ petId: req.body.petId });
  if (!petProfile)
    return res.status(400).json({ error: 'Invalid petId' });

  if (reportOne)
    return res.status(400).json({ error: 'Already Exsists' });


  console.log(req.body.petId)

  // Create a new health report
  const newReport = new report({
    petId: req.body.petId,
    currentHealthStatus: req.body.currentHealthStatus,
    description:req.body.description,
    vaccinations: req.body.vaccinations

  });

  // Save the health report to the database
  newReport.save()
    .then(() => {

      res.status(201).json({ message: 'Report Saved' });
    })
    .catch((err) => {
 
      console.log(err);
    
      res.status(500).json({ error: 'Please Fill All Vaccination Details' });
    })
});



//--------------------update Report-----------------------

const reportUpdate = async (req, res) => {

  const { pid, currentHealthStatus,vaccinations, index } = req.body;

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
    // Check if the report exists
    const deletedreport = await report.findOne({ petId: id });
    if (!deletedreport) {
      return res.status(404).json({ error: 'profile not found' });
    }
    // Delete the report
    await report.findOneAndDelete({ petId: id });

    return res.status(200).json({ message: 'profile deleted successfully', deletedreport });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

//-------------------get all reports---------------------

const getallReport = (async (req, res) => {
  try {
    // get all the reports
    const petReport = await report.find();
    // return the report
    res.status(200).json({ petReport });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//--------------------Add new Vac-----------------------

const addVac = async (req, res) => {
  const { id } = req.params;
  const { petId, currentHealthStatus,description, vaccinations } = req.body;

  try {
    // Ensure the report belongs to the petId
    const reportData = await report.findOne({ petId: id });
    if (!reportData) return res.status(404).json({ error: 'Report not found' });

    // Update the report
    await report.updateOne(
      { petId: id },
      {
        $set: { currentHealthStatus: currentHealthStatus },
        $set: { description: description },
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

    res.status(200).json({ message: 'Vaccination Deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = { addReport, reportUpdate, getReport, deleteReport, getallReport, addVac, deleteVac}
