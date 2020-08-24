const mongoose = require("mongoose");
const faker = require("faker");
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

  const populateDoctors = () => {
    const allDoctors = [];

    for (let i = 0; i < 15; i++) {
      let randoLN = faker.name.lastName();
      let randoFN = faker.name.firstName();

      let doctor = new Doctor({
        lastName: randoLN,
        firstName: randoFN,
        doctorID: i,
      });

      allDoctors.push(doctor);
    }

    Doctor.insertMany(allDoctors).then(() => {
      console.log("populated doctors");
    });
  };

  const populateAppts = () => {
    const allAppts = [];

    for (let i = 0; i < 35; i++) {
      let randoPatient = faker.name.firstName() + " " + faker.name.lastName();
      let randoDate = faker.date.between("24 Aug 2020", "28 Aug 2020");
      let randoKind = faker.random.boolean() ? "New Patient" : "Follow-up";
      let randoDoc = faker.random.number(14);

      let appt = new Appt({
        patientName: randoPatient,
        date: randoDate,
        kind: randoKind,
        doctorID: randoDoc,
      });

      allAppts.push(appt);
    }

    Appt.insertMany(allAppts).then(() => {
      console.log("populated appointments");
    });
  };

  populateDoctors();
  populateAppts();
});
