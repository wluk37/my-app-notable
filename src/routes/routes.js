const express = require("express");
const router = express.Router();
const {
  getDocs,
  getAppts,
  deleteAppt,
  postAppt,
} = require("../../database/db");

router.get("/", (req, res) => {
  res.send("hello world");
});

router.get("/doctors", (req, res) => {
  getDocs()
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.log(err);
      res.send();
    });
});

router.get("/appointments/doctor/:doctorID/date/:date", (req, res) => {
  let { doctorID, date } = req.params;
  date = new Date(date);
  console.log(date);
  getAppts(doctorID, date)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete("/appointments/doctor/:doctorID/delete/:apptID", (req, res) => {
  let { apptID } = req.params;
  console.log("apptID:", apptID);
  deleteAppt(apptID)
    .then(() => {
      res.send("success");
    })
    .catch((err) => {
      console.log(err);
      res.send("failure");
    });
});

router.post("/appointments/doctor/:doctorID/insert", (req, res) => {
  const { date, patientName, kind } = req.body;
  const { doctorID } = req.params;

  const apptDate = new Date(date);
  const minutes = apptDate.getMinutes();

  if (minutes % 15 !== 0 && minutes <= 59) {
    res.send(
      "Appointment failed. Appointment time needs to fit into a 15 minute interval"
    );
  }

  getAppts(doctorID, apptDate).then((response) => {
    let numAppts = response.length;
    if (numAppts >= 3) {
      res.send(
        "Appointment failed. There are already 3 appointments for this time."
      );
    } else {
      postAppt(date, patientName, kind, doctorID);
      res.send(
        `Appointment made successfully. There are ${
          numAppts + 1
        } appoinments scheduled for this time.`
      );
    }
  });
});

module.exports = router;
