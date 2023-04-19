const mongoose = require('mongoose')
const express = require('express');




const cusDonation_Schema = mongoose.Schema(
  {
         

    cus_id: {
      type: String,
      required: [true, 'Please add an cus id'],

    },

    description: {
      type: String,
       required: [true, 'Please add an description'],

    },

     price: {
      type: Number,
      required: [true, 'Please add a price'],
    },

    payment_date: {
      type: String,
      required: [true, 'Please add a transaction_date'],
    },

    payment_time: {
      type: String,
      required: [true, 'Please add a transaction_time'],
    },
    
    status: {
      type: String,
      enum: ['Verified', 'CANCELED', 'PAID', 'FINISHED'],
      default: 'PAID',
      required: [true, 'Please add a status'],
    },
   


  },
  {
    timestamps: true,
  }

  
)

module.exports = mongoose.model('cusDonation', cusDonation_Schema)
