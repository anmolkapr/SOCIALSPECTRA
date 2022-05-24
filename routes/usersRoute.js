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

router.post("/followuser", async (req, res) => {
  
    const {currentuserid, receiveruserid} = req.body
  
    try {
        var currentuser = await User.findOne({ _id: currentuserid })
        var currentUserFollowing = currentuser.following
        currentUserFollowing.push(receiveruserid)
        currentuser.following = currentUserFollowing;

        await User.updateOne({_id: currentuserid}, currentuser)


        var receiveruser = await User.findOne({_id: receiveruserid})
        var receiverUserFollowers = receiveruser.followers
        receiverUserFollowers.push(currentuserid)
        receiveruser.followers = receiverUserFollowers;

        await User.updateOne({ _id: receiveruserid }, receiveruser);

        res.send("Followed Successfully")
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

router.post("/unfollowuser", async (req, res) => {
  const { currentuserid, receiveruserid } = req.body;

  try {
    var currentuser = await User.findOne({ _id: currentuserid });
    var currentUserFollowing = currentuser.following;
    const temp = currentUserFollowing.filter((obj)=>obj.toString() !== receiveruserid)
    currentuser.following = temp;

    await User.updateOne({ _id: currentuserid }, currentuser);

    var receiveruser = await User.findOne({ _id: receiveruserid });
    var receiverUserFollowers = receiveruser.followers;
    const temp1 = receiverUserFollowers.filter((obj)=>obj.toString() !== currentuserid)
    receiveruser.followers = temp1;

    await User.updateOne({ _id: receiveruserid }, receiveruser);

    res.send("UnFollowed Successfully");
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

module.exports = router
