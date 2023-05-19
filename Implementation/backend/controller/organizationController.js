const asyncHandler = require("express-async-handler");
const Organization = require("../models/organizationModel");

//post org donation

const addorganization = asyncHandler(async (req, res) => {
  const {
    org_name,
    org_place,
    org_email,
    org_logo,
    org_type,
    org_Resources,
    org_description,
  } = req.body;

  const ORG = await Organization.create({
    org_name,
    org_place,
    org_email,
    org_logo,
    org_type,
    org_Resources,
    org_description,
  });
  ORG
    ? res.status(201).json(ORG)
    : res.status(400).json({ message: "organization not created" });
});

//get org donation

const readorganization = asyncHandler(async (req, res) => {
  //all payments attributes
  const organization = await Organization.find({});

  res.json(organization);
});

//put org donation

const updateorganization = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const {
    org_name,
    org_place,
    org_email,
    org_logo,
    org_type,
    org_Resources,
    org_description,
  } = req.body;

  const org = await Organization.findByIdAndUpdate(id, {
    org_name,
    org_place,
    org_email,
    org_logo,
    org_type,
    org_Resources,
    org_description,
  });

  org
    ? res.status(201).json(org)
    : res.status(400).json({ message: "organization not updated" });
});

//delete
const deleteorganization = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const org = await Organization.findByIdAndDelete(id);

  org
    ? res.status(200).json(org)
    : res.status(400).json({ message: "organization not deleted" });
});

module.exports = {
  addorganization,
  readorganization,
  updateorganization,
  deleteorganization,
};
