const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const port = 8000;
const db = require("./config/mongoose");
const Contact = require("./model/contact");
const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded());
app.use(express.static("./assests"));
// let contact_list = [
//   {
//     Name: "Nilavo Bhattacharya",
//     Phone: "7980050408",
//   },
//   {
//     Name: "Tony Stark",
//     Phone: "111111111",
//   },
// ];
app.get("/", (req, res) => {
  Contact.find({}, (err, contact_list) => {
    if (err) {
      console.log("Something went wrong while rendering data");
      return;
    }
    return res.send("<h1> Testing  </h1>")
  });
});
app.get("/delete", (req, res) => {
  console.log(req.query.id);
  let id = req.query.id;
  Contact.findByIdAndDelete(id, (err) => {
    if (err) {
      console.log("Something went wrong");
      return;
    }
    res.redirect("back");
  });
  // let reqIndex = contact_list.findIndex((contact) => {
  //   return contact.Phone == req.query.phone;
  // });
  // contact_list.splice(reqIndex, 1);
});
app.post("/sendData", (req, res) => {
  //contact_list.push(req.body);
  Contact.create(
    {
      Name: req.body.Name,
      Phone: req.body.Phone,
    },
    (err, newcontact) => {
      if (err) {
        console.log("Something went wrong while creating data");
        return;
      }
      console.log(newcontact._id);
      return res.redirect("back");
    }
  );
});
app.listen(port, (err) => {
  if (err) {
    console.log("Something went wrong", err);
  }
  console.log("Server up and running");
});
