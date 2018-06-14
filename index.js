//common JS modules
//import express library
const express = require("express");
//is used to set up configuration and listen upcoming requests and send them to handlers
const app = express();

//requests handlers

app.get("/", (req,res) => {
  res.send({ hi: 'there' });
});

//environment variable
const PORT = process.env.PORT || 5000;
app.listen(PORT);
