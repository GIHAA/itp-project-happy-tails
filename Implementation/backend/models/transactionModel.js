const mongoose = require("mongoose");

const tran_Schema = mongoose.Schema(
  {
    tran_title: {
      type: String,
      required: [true, "Please add an transaction_tittle"],
    },

    tran_type: {
      type: String,
      enum: ["INCOME", "EXPENSES"],
      default: "INCOME",
      required: [true, "Please add an transaction_type"],
    },

    tran_target: {
      type: String,
      enum: [
        "Health Service Management",
        "Stock Management",
        "Event Management",
        "Vehicle Management",
        "Supplier Management",
      ],
      default: "Health Service Management",
      required: [true, "Please add an transaction_target"],
    },

    tran_amount: {
      type: Number,
      required: [true, "Please add a transaction_amount"],
    },

    tran_date: {
      type: String,
      required: [false, "Please add a transaction_date"],
    },

    tran_time: {
      type: String,
      required: [false, "Please add a transaction_time"],
    },

    tran_status: {
      type: String,
      enum: ["CANCELED", "PAID", "FINISHED"],
      default: "PAID",
      required: [true, "Please add a transaction status"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("transaction", tran_Schema);
