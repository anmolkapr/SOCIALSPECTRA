const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

router.post("/register", async (req, res) => {
    try {
        
        const newuser = new User(req.body)
        //Checking if user already exists
        const user1 = await User.findOne({username:req.body.username});
        if(user1){
            res.send(`${newuser.username} Already registered`)
        }
        await newuser.save()
        res.send(`${newuser.username} registered Successfully`)
    } catch (error) {
        console.log(error);
        return res.json(400).json(error);
    }
});

router.post("/login",async(req,res)=>{
    try {
        //const user= await User.findOne({username:req.body.username, password:req.body.password})
        const user= await User.findOne({username:req.body.username})
        if (user)
         { //res.send(`${user.username} Logged in successfully`)
            if(await user.matchPassword(req.body.password)){
                res.send(user);
            }else{
               return res.send("Invalid password")
            }           
       } else
            res.send("Invalid credentials")
    } catch (error) {
        console.log(error);
        return res.json(400).json(error);
    }
});

router.get("/getallusers", async(req, res) =>{
    try {
        const users = await User.find()
        res.send(users)
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
});

module.exports = router
