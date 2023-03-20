const mongoose = require('mongoose')

const healthSchema = mongoose.Schema(
  {
    petId: {
        type: String,
        required: true,
      },
      currentHealthStatus: {
        type: String,
        required: true,
      },
      vaccinations: [{
        name: {
          type: String,
          required: true,
        },
        dateGiven: {
          type: Date,
          required: true,
        },
        expirationDate: {
          type: Date,
          required: true,
        },
      }],
  }
)

module.exports = mongoose.model('report', healthSchema)
