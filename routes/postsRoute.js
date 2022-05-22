const express = require("express");
const router = express.Router();
const { cloudinary } = require("../cloudinary");
const Post = require("../models/postModel");
const moment = require("moment")


router.post("/addpost", async (req, res) => {
  try {
    const uploadResponse = await cloudinary.v2.uploader.upload(req.body.image, {
      folder: "socialspectra",
      use_filename: true,
    });

    req.body.image = uploadResponse.url;

    const newpost = new Post(req.body);

    await newpost.save();

    res.send("Post added successfully");
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

//route for getting all the posts
router.get("/getallposts", async(req, res) =>{

    try{
      // populate is basically filling another schema data in one schema 
      // here filling user schema data in post schema
        const posts = await Post.find().populate('user')
        res.send(posts)
    }
    catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
})

router.post("/likeorunlikepost",async(req,res)=>{
  try{
    const post = await Post.findOne({_id : req.body.postid})

    var likes = post.likes;
    
    
    if(likes.find(obj => obj.user == req.body.userid)){
      // UNLIKE implemented it user is already there
        const dummy = likes.filter(obj => obj.user.toString() !== req.body.userid)

        post.likes = dummy
        await Post.updateOne({_id:req.body.postid},post)
        res.send('Post unliked successfully')
    }
    else{
      likes.push({user:req.body.userid, date:moment().format('MMM DD yyyy')})

      post.likes=likes

      await Post.updateOne({_id:req.body.postid},post)
      res.send('Post liked successfully')
    }

  }catch(error){
      console.log(error);
      return res.status(400).json(error);
  }
})

router.post("/addcomment",async(req,res)=>{
  try{
    const post = await Post.findOne({_id : req.body.postid});

    var comments = post.comments;
   
    comments.push({user: req.body.userid, date : moment().format('MMM DD YYYY'), comment : req.body.comment})
    
    post.comments=comments;
    await Post.updateOne({ _id: req.body.postid }, post);
    res.send("Comment Added Successfully");

  }catch(error){
      console.log(error);
      return res.status(400).json(error);
  }
})


module.exports = router