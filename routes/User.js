const express = require("express");
const app = express();
var path = require("path");
var router = express.Router();
app.use(express.static(path.join(__dirname, "/public")));
app.use("/public", express.static(__dirname + "/public"));
const { database } = require("../models/modelExport");
const Op = database.Sequelize.Op;
const users = database.users;
const contactMe = database.contactMe;
app.use(express.json());
var bcrypt = require("bcrypt");
var saltRouds = 10;

require("dotenv/config");
app.set("views", "./views");
app.set("view engine", "ejs");


// router.post("/login", async (req, res) => {
//     try {
//       let newUser = req.body;
//       console.log(newUser)      
//     //   const project = await users.findOne({ where: { uname: newUser.uname } });      
//       await users.findOne({ where: { [Op.and]: [newUser.uname] } })
//         .then(async (profile) => {
//           if (!profile) {
//             bcrypt.hash(newUser.psw, saltRouds, async (err, hash) => {
//               if (err) {
//                 console.log("Error is Mansi", err.message);
//               } else {
//                 newUser.userId = req.body.uname;
//                 newUser.password = hash;
//                 await users.create(newUser).then(() => 
//                 {
//                     res.status(200).send("User Registerd");
//                 })
//                   .catch(err);
//                 {
//                   console.log(err);
//                 }
//               }
//             });
//           } else {
//             res.status(401).send("User already exists");
//           }
//         });
//     } catch (err) {
//         console.log("Masi Error h")
//       res.send({
//         message: err,
//       });
//     }
//   });
    router.post("/login", async (req, res) => {
    var x = new Boolean(false);
    var newUser = req.body;
    try {
        const detectedUser = await users.findOne({
        where: { userId: newUser.uname },        
      });
      console.log("************************");
      console.log(detectedUser);
      if(detectedUser == null)
      {
        x = false;  
        bcrypt.hash(newUser.psw, saltRouds, async (err, hash) => 
        {
            if (err) 
            {
                console.log("Error is ::", err.message);
            }
            else 
            {
                newUser.userId = req.body.uname;
                newUser.password = hash;
                await users.create(newUser).then(() => 
                    {
                        res.status(200).send("User Registerd");
                    })
                .catch(err);
                    {
                    console.log(err);
                    }
            }                                
        });
      }
      // WPNH
      else
       { 
            bcrypt.compare(newUser.psw, detectedUser.password, async (err, result) =>  {
                if (err) {
                    console.log("Error is", err.message);
                }
                else if (result == true)
                {                              
                        const data = await contactMe.findAll({ limit: 50 });
                        console.log(data);
                        if(data)
                        {
                            res.render("myMessages", {                            
                                count: Object.keys(data).length,                            
                                data: data,
                            });                                                   
                        }
                        else{
                            console.log("Error in reading Data");
                        }
                }
                else{                
                    console.log(result)
                }
            }) ;    
        }    
    
    //   if (!detectedUser) {
    //     res.send("User does not exist");
    //   } else {
    //     bcrypt.compare(
    //       newUser.password,
    //       detectedUser.password,
    //       async (err, result) => {
    //         if (err) {
    //           console.log("Error is", err.message);
    //         } else if (result == true) {
    //           const payload = {
    //             id: detectedUser.id,
    //             name: detectedUser.firstName + " " + detectedUser.lastName,
    //             email: detectedUser.email,
    //           };
    //           jsonwt.sign(
    //             payload,
    //             process.env.SECRET_KEY,
    //             { expiresIn: 3600 },
    //             (err, token) => {
    //               if (data) {
    //                 console.log(data);
    //                 res.render("myMessages", {
    //                   fullname: detectedUser.firstName + " " + detectedUser.lastName,
    //                   count: Object.keys(data).length,
    //                   data: data,
    //                 });
    //               } else {
    //                 console.log("errr");
    //               }
    //             }
    //           );
    //         } else {
    //           res.status(401).send("Unauthorized Access");
    //         }
    //       }
    //     );
    //   }
    } catch (err) {
      console.log("Error is", err.message);
    }
  });


  router.post("/forgetPassword", async (req, res) => {
    const updateData = req.body;
    console.log(updateData);
    await users
      .findOne({ where: { userId: req.body.email } }).then((data) => {
        if (!data) {
          res.status(401).send("User Not Found");
        } else {
          bcrypt.hash(req.body.password, saltRouds, async (err, hash) => {
            if (err) {
              console.log("Error while updating password");
            } else {
              req.body.password = hash;
              await users
                .update(updateData, { where: { userId: req.body.email } })
                .then(() => {
                  res.sendFile(path.resolve("views/successfulPassword.html"));
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });



module.exports = router;