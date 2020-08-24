const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  lastName: String,
  firstName: String,
  doctorID: Number,
});

const apptSchema = new mongoose.Schema({
  patientName: String,
  date: Date,
  kind: String,
  doctorID: Number,
});

const Doctor = mongoose.model("Doctors", doctorSchema);
const Appt = mongoose.model("Appointments", apptSchema);

module.exports = { Appt, Doctor };
