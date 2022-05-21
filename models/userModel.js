const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    privateAccount: {type: Boolean, required: false, default: false},
    
    followers:[{type: mongoose.Schema.Types.ObjectId, req: "users"}],
    following: [{type: mongoose.Schema.Types.ObjectId, req: "users"}],
    profilePicUrl: {type: String, required: false, default: "" },
    bio : {type: String, required: false, default: "" },
    savedPosts : [],
    archievedPosts : []
    
    }, {
    timestamps: true
})

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  
  userSchema.pre("save", async function (next) {
    if (!this.isModified) {
      next();
    }
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });

  
module.exports = mongoose.model("users", userSchema);