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
          type: String,
          required: true,
        },
        expirationDate: {
          type: String,
          required: true,
        },
      }],
  }
)

module.exports = mongoose.model('report', healthSchema)
