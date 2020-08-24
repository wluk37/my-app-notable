const mongoose = require("mongoose");
const { Appt, Doctor } = require("./schema");

mongoose.connect("mongodb://localhost:27017/myDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const conn = mongoose.connection;
conn.on("error", (err) => {
  console.error.bind(console, "connection error:");
});

conn.once("open", () => {
  console.log("Connection Success!");
});

const getDocs = () => {
  const allDocs = Doctor.find();
  return allDocs;
};

const getAppts = (doctorID, date) => {
  const allAppts = Appt.find({ doctorID, date: { $gte: date } });
  return allAppts;
};

const deleteAppt = (apptID) => {
  const deletedAppt = Appt.findByIdAndDelete(apptID);
  return deletedAppt;
};

const postAppt = (date, patientName, kind, doctorID) => {
  const postedAppt = new Appt({
    patientName,
    date,
    kind,
    doctorID,
  });
  return postedAppt.save();
};
module.exports = { getDocs, getAppts, deleteAppt, postAppt };
