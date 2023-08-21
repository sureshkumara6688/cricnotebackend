module.exports = app => {
  const Cricnote = require("../controllers/cricnote.controller.js");
const userinfo =require("../controllers/nodemailer/mailer.js")
  const multer = require('multer');
  

  const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {        
        cb(null , Date.now()+'_'+file.originalname);
    }
  });
  const upload = multer({ storage: storage }) 

  var router = require("express").Router();
  
  // Create a new Cricnote
  router.post("/addnews",upload.single('file'), Cricnote.createnews);

  // Retrieve all Cricnote
  router.get("/newslist", Cricnote.findAllnews);

  // Retrieve all published Cricnote
  router.post("/category", Cricnote.findAllcategory);


  // Retrive user information send to mail
  router.post("/contact", userinfo.finduserdetail);


  // Retrieve a single Cricnote with id
  router.get("/:id", Cricnote.findOne);

  // Update a Cricnote with id
  // router.put("/edit", Cricnote.update);

  // Delete a Cricnote with id
  router.delete("/delete1", Cricnote.delete);

  app.use("/api/Cricnote", router);
  
  app.use("/api/userinfo", router);
};
