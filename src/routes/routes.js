const express = require("express");
const router = express.Router();
const {
  getDocs,
  getAppts,
  deleteAppt,
  postAppt,
} = require("../../database/db");

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
  const { date, patient, kind } = req.body;
  const { doctorID } = req.params;

  getAppts(doctorID, date).then((response) => {
    let apptTally = 0;
    response.forEach((appt) => {
      let apptTimes = appt.date.getTime();
      if (apptTimes === date) {
        apptTally++;
      }
    });

    if (apptTally < 3) {
      postAppt(date, patient, kind, doctorID)
        .then((response) => {
          res.send("success");
        })
        .catch((err) => {
          console.log(err);
          res.send("failure");
        });
    }
  });
});

module.exports = router;
