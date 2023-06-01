const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name cannot be empty"],
  },
  password: {
    type: String,
    required: [true, "password cannot be empty"],
    minLength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "please confirm your password"],
    validate: {
      // this only works on SAVE !!!
      validator: function (el) {
        return el === this.password; // validate if password === passwordConfirm
      },
      message: "Passwords do not match!",
    },
  },
  email: {
    type: String,
    unique: true,
    required: [true, "please provide a sufficient email address"],
    lowercase: true,
    validate: [validator.isEmail, "please provide a valid email"],
  },
  photo: String,
  passwordChangedAt: Date
});
// we will encrypt our passwords using pre save middleware here.

userSchema.pre("save", async function (next) {
  //run if the password is actually modified or created.
  if (!this.isModified("password")) return next();
  //we will do the hashing (encryption) here.
  //bcrypt will add some random string to the password so that even two identical passwords will not be encrypted the same.
  this.password = await bcrypt.hash(this.password, 12); // salt cost parameter is 12.
  this.passwordConfirm = undefined; // we needed confirm just to make sure user did not enter the wrong password.
  // now we can set it to be undefined.
  next();
});

//create an instance method that is available on all documents on the collection
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {

  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = async function(JWTTimeStamp){
    if(this.passwordChangedAt){
        const changedTimeStamp = parseInt(this.passwordChangedAt.getTime()/1000)
        
        return JWTTimeStamp < changedTimeStamp;
    }

    //false means not changed 
    return false;
}

const User = mongoose.model("User", userSchema);

module.exports = User;
