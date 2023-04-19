const express = require('express')
const cors = require('cors')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware') 
const connectDB = require('./config/db');
const port = process.env.port || 8080

connectDB()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use('/api/users', require('./routes/userRoutes.js'))
app.use('/api/booking/', require('./routes/bookingRoutes.js'))
app.use('/api/vehicle/', require('./routes/vehicleRoutes.js'))
app.use('/api/transport/', require('./routes/transportRoutes.js'))
app.use('/api/availability/', require('./routes/availabilityRoutes.js'))
app.use('/api/VehReqPayment/', require('./routes/vehicleBudgetRoutes'))




app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`));






