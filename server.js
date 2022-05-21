const express = require("express");

const app = express();
const dbConnection = require("./db");
const usersRoute = require("./routes/usersRoute")
const postsRoute = require("./routes/postsRoute")

app.use(express.json({limit: '25mb'}))
//added limit to prevent overflow
app.use("/api/users", usersRoute)
app.use("/api/posts", postsRoute)

const port = process.env.PORT || 5000;

app.listen(port,() => console.log(`Server running on port ${port}`));