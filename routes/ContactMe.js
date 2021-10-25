const express = require("express");
const app = express();
var path = require("path");
var router = express.Router();
const { database } = require("../models/modelExport");
const sequelize = require("../models/config");
const contactMe = database.contactMe;
// const Op = database.Sequelize.Op;
app.use(express.json());
app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));
app.use("/public", express.static(__dirname + "/public"));

router.post("/contactMe", async (req, res) => {
    try {
      const data = req.body;
      console.log(data);
      if (data) {
        await contactMe.create(data).then(() => {
          res.sendFile(path.resolve("views/success.html"));
        });
      }
    } catch (error) {
      console.log(error);
     res.send("Error in contact Me!!!");
    }
  });

  router.get("/contactMe", async (req, res) => {    
    const data = await contactMe.findAll({ limit: 10 });
    if (data) {
      console.log(data);
      res.render("myMessages", {
        fullname: data[0].fname,
        mobileNumber: data[0].mobileNumber,
        email: data[0].email,
        message: data[0].msg,
        count: Object.keys(data).length,
        data: data,
      });
    } else {
      console.log("errr");
    }
  });

  module.exports = router;