const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://anmolkapr:anmolkapr@cluster0.u9fys.mongodb.net/gramstore",{useUnifiedTopology: true, useNewUrlParser: true});

const connection = mongoose.connection;

connection.on("connected",()=>
console.log("mongo Db connection established "));

connection.on("error",()=>console.log("mongo error "));

module.exports = mongoose;
