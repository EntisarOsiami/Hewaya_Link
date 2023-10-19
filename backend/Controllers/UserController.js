import asyncHandler from "express-async-handler";
import User from "../models/userModels.js";
import generateToken from "../Utils/generateToken.js";
import { validationResult } from "express-validator";
import rateLimit from "express-rate-limit";
import nodemailer from "nodemailer";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
});

function sendResponse(res, data, message, success = true) {
  res.status(success ? 200 : 400).json({
    success,
    data,
    message,
  });
}

// @desc    login user & get token
// @route   POST /api/user/login
// @access  Public
const loginUser = asyncHandler(async (req, res, next) => {
  try {
    const { emailOrUsername, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (user && (await user.matchPassword(password))) {
      const token = generateToken(res, user._id);

      sendResponse(res, {
        token,
        user: {
          _id: user._id,
          name: user.Name,
          username: user.username,
          email: user.email,
        },
      }, "Login successful");
    } else {
      sendResponse(res, null, "Invalid email or password", false);
    }
  } catch (error) {
    next(error);
  }
});

// @desc    Register a new user
// @route   POST /api/user/register
// @access  Public
const registerUser = asyncHandler(async (req, res, next) => {
  try {
    const { firstName, lastName, username, email, password, birthDate } =
      req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendResponse(res, null, "Invalid input fields", false);
    }

    const userExists = await User.findOne({ $or: [{ email }, { username }] });

    if (userExists) {
      return sendResponse(res, null, "User with the same email or username already exists", false);
    }

    const user = await User.create({
      Name: {
        firstName,
        lastName,
      },
      username,
      email,
      password,
      birthDate,
    });

    if (user) {
      const token = generateToken(res, user._id);

      sendResponse(res, {
        token,
        user: {
          _id: user._id,
          name: user.Name,
          username: user.username,
          email: user.email,
          birthDate: user.birthDate,
          role: user.role,
        },
      }, "User registration successful");
    } else {
      sendResponse(res, null, "Invalid user data", false);
    }
  } catch (error) {
    next(error);
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/user/logout
// @access  Public
const logoutUser = (req, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    sendResponse(res, null, "Logged out successfully");
  } catch (error) {
    console.error("Error logging out:", error);
    sendResponse(res, null, "An error occurred while logging out", false);
  }
};

// @desc    Get user profile
// @route   GET /api/user/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      sendResponse(res, {
        _id: user._id,
        name: user.Name,
        username: user.username,
        email: user.email,
      }, "User profile retrieved successfully");
    } else {
      sendResponse(res, null, "User not found", false);
    }
  } catch (error) {
    next(error);
  }
});
// @desc    update user profile
// @route   PUT /api/user/profile
// @access  Private

const updateUserProfile = asyncHandler(async (req, res, next) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      sendResponse(res, null, "User not found", false);
      return;
    }

    if (firstName) user.Name.firstName = firstName;
    if (lastName) user.Name.lastName = lastName;
    if (username && user.username !== username) {
      const userExists = await User.findOne({ username });
      if (userExists) {
        sendResponse(res, null, "Username already exists", false);
        return;
      }
      user.username = username;
    }
    if (email && user.email !== email) {
      const userExists = await User.findOne({ email });
      if (userExists) {
        sendResponse(res, null, "User Email Already Exists", false);
        return;
      }
      user.email = email;
    }

    if (password) {user.password = password; }

    const updatedUser = await user.save();

    sendResponse(res, {
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
    }, "User profile updated successfully");
  } catch (error) {
    next(error);
  }
});

// @desc    Reset user password
// @route   POST /api/user/reset-password
// @access  Public
const resetPassword = asyncHandler(async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return sendResponse(res, null, "User not found", false);
    }

    // Generate a unique token and send it to the user's email
    const token = generateToken(res, user._id);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: "Password Reset Request",
      text: `Click on the following link to reset your password: ${process.env.CLIENT_URL}/reset-password/${token}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        sendResponse(res, null, "An error occurred while sending the email", false);
      } else {
        console.log("Email sent:", info.response);
        sendResponse(res, null, "Password reset email sent successfully");
      }
    });
  } catch (error) {
    next(error);
  }
});

export {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  resetPassword,
};
