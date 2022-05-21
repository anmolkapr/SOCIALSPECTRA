const express = require("express");
const router = express.Router();
const { cloudinary } = require("../cloudinary");
const Post = require("../models/postModel");


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




module.exports = router