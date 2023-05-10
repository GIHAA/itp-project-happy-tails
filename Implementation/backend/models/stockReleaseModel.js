const mongoose = require("mongoose");

const stockReleaseSchema = mongoose.Schema(
  {
    date: {
      type: String,
      required: [true, "Please add a date"],
    },

    item_code: {
      type: String,
      required: [true, "Please add an item ID"],
    },

    item_name: {
      type: String,
      required: [true, "Please add an item name"],
    },

    item_brand: {
      type: String,
      required: [true, "Please add an item brand"],
    },

    category: {
      type: String,
      lowercase: true,
      required: [true, "Please select an item category"],
    },

    releaseQty: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("stockRelease", stockReleaseSchema);
