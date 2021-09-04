// import 
require("dotenv").config();
const express = require("express");
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

//routers
const articles = require('./router/articleRouter')
app.use('/', articles)
const users = require('./router/userRouter')
app.use('/', users)
const likes = require('./router/likeRouter')
app.use('/', likes)
const comments = require('./router/commentRouter')
app.use('/', comments)

app.get("/", (req, res) => {
  res.status(200).send("Welcome to FWP API.");
});

// Connect to MongoDB:
const url = process.env.DATABASE_URL
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Successfully connected to database");
})
  .catch((error) => {
    console.log("Database connection failed.");
    console.error(error);
    process.exit(1);
  });

// server
const port = process.env.PORT || 9000

app.listen(port, () => {
  console.log(`Web server is listening on port ${port}.`)
})

