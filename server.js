const express = require("express");
const cors = require("cors");
const app = express();
var path = require('path');
var corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001']
};
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");

  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Cricnote application." });
});
app.use('/images', express.static('uploads'));

require("./app/routes/cricnote.routes")(app);
const PORT = process.env.PORT || 6688;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
