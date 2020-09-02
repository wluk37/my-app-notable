const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const router = require("./routes/routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", router);
app.get("/doctors", router);
app.get("/appointments/doctor/:doctorID/date/:date", router);
app.delete("/appointments/doctor/:doctorID/delete/:apptID", router);
app.post("/appointments/doctor/:doctorID/insert", router);

app.listen(port, () => {
  console.log("My app is listening on port " + port);
});
