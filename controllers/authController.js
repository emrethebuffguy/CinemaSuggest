const {promisify} = require("util");
const User = require("../models/adminmodel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");


const signToken = (id) => {
  return jwt.sign(
    {
      id: id,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });
    const token = signToken(newUser._id);

    res.status(201).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  //1. check if email and password actually exist

  if (!email || !password) {
    return next(
      res.status(400).json({
        status: "Bad Request",
        message: "Please fill in your email address and password",
      })
    );
  }

  //2. check if user exists && password is correct

  const user = await User.findOne({ email: email }).select("+password"); //password select is false so we required it.

  if (!user || !(await user.correctPassword(password, user.password))) {
    // we checked if the user exists and
    return next(
      res.status(401).json({
        // if the given password is correct
        status: "Unauthorized", //if both are valid, we go to the next step
        message: "Invalid Credentials",
      })
    );
  }

  //3. if everything is ok, send the token back to the client.

  const token = signToken(user._id);
  res.status(200).json({
    status: "success",
    token,
  });
};

exports.protect = async (req, res, next) => {

  //1. get the token and check if it exists.
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      res.status(401).json({
        status: "Unauthorized", //if both are valid, we go to the next step
        message: "You are not logged in. Please log in to access the data.",
      })
    );
  }

  //2. check the validity of the token (verify).

  let decoded;
  try {
    decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET)
    
  } catch (error) {
    next(res.status(401).json({
      status: "Unauthorized",
      message: "Invalid or expired token."
    }))
  }
  
  //3. check if user still exists.
  const freshUser =  await User.findById(decoded.id)
  if(!freshUser){
    next(res.status(401).json({
      status: "Unauthorized",
      message: "The user belonging to this token no longer exists."
    }))
  }

  //4. check if user changed password after the token was issued.

  if(!freshUser.changedPasswordAfter(decoded.iat)){
    return next( res.status(401).json({
      status: "Unauthorized",
      message: "The password for this user is changed recently. Please login again."
    }))
  }

  req.user = freshUser;
  next();
};
