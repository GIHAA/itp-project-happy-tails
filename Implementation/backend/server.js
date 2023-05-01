const express = require("express");
const cors = require("cors");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");

const eventregister = require("./routes/registerEventRoutes");
const eventRoutes = require("./routes/eventRoutes");
const efeedbackRoutes = require("./routes/eventFeedbackRoutes");
const vetRoutes = require("./routes/vetRoutes");
const healthRoutes = require("./routes/healthRoutes");
const breedRoutes = require("./routes/breedRoutes");
const statusRoutes = require("./routes/statusRoutes");

const budgetReqRoutes = require("./routes/budgetRequestRoutes");
const eventStockRequestRoutes = require("./routes/eventStockRequestRoutes");
const eventAmountRoutes = require("./routes/eventAmountRoutes");

const connectDB = require("./config/db");
const port = process.env.port || 8080;

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/userRoutes.js"));
app.use("/api/booking/", require("./routes/bookingRoutes.js"));
app.use("/api/sendEmail/", require("./routes/sendEmailRoutes.js"));
app.use("/api/userspets", require("./routes/usersPetsRoutes"));
app.use('/api/feedback', require('./routes/feedBackRoutes'))


app.use("/api/vehicle/", require("./routes/vehicleRoutes.js"));
app.use("/api/transport/", require("./routes/transportRoutes.js"));
app.use("/api/availability/", require("./routes/availabilityRoutes.js"));
app.use("/api/VehReqPayment/", require("./routes/vehicleBudgetRoutes"));

app.use("/api/users", require("./routes/userRoutes"));


app.use("/api/vet", vetRoutes);
app.use("/api/petbreed", breedRoutes);
app.use("/api/health", healthRoutes);
app.use("/api/petstatus", statusRoutes);


app.use("/api/counter", require("./routes/counterRoutes"));
app.use("/api/vet", require("./routes/vetRoutes"));
app.use("/api/suppliers/", require("./routes/suppliersRoutes"));
app.use("/api/inventory", require("./routes/inventoryItemRoutes"));
app.use("/api/inventory", require("./routes/stockRequestRoutes"));
app.use("/api/inventory", require("./routes/stockReleaseRoutes"));
app.use("/api/vehicle/", require("./routes/vehicleRoutes.js"));
app.use("/api/transport/", require("./routes/transportRoutes.js"));
app.use("/api/availability/", require("./routes/availabilityRoutes.js"));
//app.use('/api/employee', require('./route/employee.js'))
app.use("/api/eventregister", eventregister);
app.use("/api/event", eventRoutes);
app.use("/api/eventfeedback", efeedbackRoutes);
app.use("/api/counter", require("./routes/counterRoutes"));
app.use("/api/eventbudget", budgetReqRoutes);
app.use("/api/eventstock", eventStockRequestRoutes);
app.use("/api/eventamount", eventAmountRoutes);
app.use("/api/inventory", require("./routes/stockRequestRoutes"));
app.use("/api/stockBudget", require("./routes/stockBudgetRequestRoute"));
app.use("/api/counter", require("./routes/counterRoutes"));
app.use("/api/eventbudget", budgetReqRoutes);
app.use("/api/eventstock", eventStockRequestRoutes);
app.use("/api/eventamount", eventAmountRoutes);

app.use("/api/payment/", require("./routes/addPaymentRoutes.js"));
app.use("/api/transaction", require("./routes/transactionRoutes.js"));
app.use("/api/organization", require("./routes/organizationRoutes.js"));
app.use("/api/cusDonation", require("./routes/cusDonationRoutes.js"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
