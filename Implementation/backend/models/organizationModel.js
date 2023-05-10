const mongoose = require("mongoose");

const org_Schema = mongoose.Schema(
  {
    org_name: {
      type: String,
      required: [true, "Please add organization name"],
    },
    org_place: {
      type: String,
      required: [true, "Please add  organization place"],
    },
    org_email: {
      type: String,
      required: [true, "Please add organization email"],
    },
    org_logo: {
      type: String,
      required: [true, "Please add organization logo"],
    },

    org_type: {
      type: String,
      enum: ["Regional", "Global"],
      default: "Regional",
      required: [true, "Please add  organization type"],
    },

    org_Resources: {
      type: String,
      enum: ["Small", "Medium", "Large"],
      default: "Medium",
      required: [true, "Please add  organization Resources type"],
    },

    org_description: {
      type: String,
      required: [true, "Please add  organization_description"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("organization", org_Schema);
