import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "./../config/generateToken.js";
import {} from "bcrypt";

//@route /api/user/register
//@access public
//@description to register new users

export const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All Fields are required");
  }

  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    res.status(400);
    throw new Error(`${email} is already taken`);
  }

  const user = await User.create({ name, email, password });

  if (!user) {
    res.status(400);
    throw new Error(`Unable to create account for ${email}`);
  }
  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
});

//@route /api/user/login
//@access public
//@description to login new users

export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error(`User with email-${email} not found`);
  }
  if (!(await user.matchPassword(password))) {
    res.status(400);
    throw new Error(`Invalid credentials provided`);
  }

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    image: user.image,
    gender: user.gender,
    about: user.about,
    token: generateToken(user._id),
  });
});

//@route /api/user/
//@access private
//@description to fetch / search the available users from DB
export const getAllUsers = asyncHandler(async (req, res, next) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : null;

  // if (!keyword) {
  //   return res.status(200).send([]);
  // }

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.status(200).send(users);
});

//@route /api/user/
//@access private
//@description to update user profile
export const updateUserProfile = asyncHandler(async (req, res, next) => {
  try {
    const { name, about, image, password } = req.body;
    const userData = await User.findById(req.user._id);
    if (!userData) {
      res.status(404);
      throw new Error("User is not available");
    }

    userData.name = name ? name : userData.name;
    userData.about = about ? about : userData.about;
    userData.image = image ? image : userData.image;
    userData.password = password ? password : userData.password;
    await userData.save();

    res.status(200).json(userData);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});
