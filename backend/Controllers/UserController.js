import asyncHandler from "express-async-handler";
import {User} from "../models/index.js";
import generateToken from "../Utils/generateToken.js";
import { validationResult } from "express-validator";
// import rateLimit from "express-rate-limit";
import nodemailer from "nodemailer";
import crypto from "crypto";
import sendResponse from "../Utils/sendResponse.js";

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 10, // limit each IP to 10 requests per windowMs
// });

//********************************************************************************************************************************* */
// @desc    Login user
// @route   POST /api/user/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {

  const { emailOrUsername, password } = req.body;

  const user = await User.findOne({ $or: [{ email: emailOrUsername }, { username: emailOrUsername }] });


  if (user && (await user.matchPassword(password))) {
    const token = generateToken(res, user._id);

    sendResponse(res, {
      token,
      user:user,
    }, "Login successful");
  } else {
    sendResponse(res, null, "Invalid email or password", false);
  }
});

// @desc    Register a new user
// @route   POST /api/user/register
// @access  Public


const registerUser = asyncHandler(async (req, res, next) => {


  try {
    const {
      name: {
        firstName,
        lastName
      },
      email: {
        address
      },
      username,
      password,
      birthDate,
      profilePicture
    } = req.body;


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendResponse(res, null, "Invalid input fields", false);
    }
    const userExists = await User.findOne({
      $or: [{ "email.address": req.body.email.address }, { username: username }],
    });


    if (userExists) {
      return sendResponse(res, null, "User with the same email or username already exists", false);
    }
    const user = await User.create({
      name: {
        firstName,
        lastName,
      },
      email: {
        address
      },
      username,
      password: {
        value: password
      },
      birthDate,
      profilePicture
    });

    // Create token and send it in a cookie

    if (user) {
      const token = generateToken(res, user._id);

    // create email verification token save it in the user model  

      const emailVerificationToken = crypto.randomBytes(20).toString("hex");
      user.email.verificationToken = emailVerificationToken;
      user.email.verificationTokenExpiresAt = Date.now() + 3600000; // 1 hour
      await user.save();

// send a verification email to the user email address
const transporter = nodemailer.createTransport({
  host: 'smtp.elasticemail.com',
  port: 2525,
  auth: {
    user: process.env.ELASTIC_EMAIL_USERNAME,
    pass: process.env.ELASTIC_EMAIL_API_KEY,
  },
});
      const verificationURL = `${process.env.CLIENT_URL}/verify/${emailVerificationToken}`;

      const mailOptions = {
        from: process.env.ELASTIC_EMAIL_USERNAME,
        to: user.email.address,
        subject: "Verify your email",
        text: `Click on the following link to verify your email: ${verificationURL}`,
        html: `<p>Welcome to our platform!</p>
             <p>Please <a href="${verificationURL}">click here</a> to verify your email and get started.</p>
             <p>If the link doesn't work, you can copy and paste the following link into your browser:</p>
             <p>${verificationURL}</p>
             <p>Thank you for joining us!</p>`
      };



      transporter.sendMail(mailOptions, (error) => {
        if (error) {
          console.error("Error sending verification email:", error);
        } else { /* empty */ }
      });

      // send a response to the client
      sendResponse(res, {
        token,
        user: user,
      }, "User registration successful");
    } else {
      sendResponse(res, null, "Invalid user data", false);
    }
  } catch (error) {
    next(error);
  }
});

// @desc    Resend email verification token
// @route   POST /api/user/resend-verification
// @access  Public

const resendVerificationEmail = asyncHandler(async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ "email.address": email });
    
    if (!user) {
      return sendResponse(res, null, "User not found", false);
    }

    if (user.email.isVerified) {
      return sendResponse(res, null, "Email is already verified", false);
    }

    const emailVerificationToken = crypto.randomBytes(20).toString("hex");
    user.email.verificationToken = emailVerificationToken;
    user.email.verificationTokenExpiresAt = Date.now() + 3600000; // 1 hour
    await user.save();

    const transporter = nodemailer.createTransport({
      host: 'smtp.elasticemail.com',
      port: 2525,
      auth: {
        user: process.env.ELASTIC_EMAIL_USERNAME,
        pass: process.env.ELASTIC_EMAIL_API_KEY,
      },
    });
    
    const verificationURL = `${process.env.CLIENT_URL}/verify/${emailVerificationToken}`;
    
    const mailOptions = {
      from: process.env.ELASTIC_EMAIL_USERNAME,
      to: user.email.address,
      subject: "Verify your email",
      text: `Click on the following link to verify your email: ${verificationURL}`,
      html: `<p>Please <a href="${verificationURL}">click here</a> to verify your email and get started.</p>
             <p>If the link doesn't work, you can copy and paste the following link into your browser:</p>
             <p>${verificationURL}</p>
             <p>If you did not request this, please ignore this email.</p>`
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.error("Error sending verification email:", error);
        sendResponse(res, null, "Error sending verification email", false);
      } else {
        sendResponse(res, null, "Verification email sent successfully", true);
      }
    });
  } catch (error) {
    next(error);
  }
});



// @desc   verify email
// @route   POST /api/user/verify-email
// @access  Public


const verifyEmail = asyncHandler(async (req, res, next) => {
  try {
    const { token } = req.body;
    const user = await User.findOne({
      "email.verificationToken": token,
      "email.verificationTokenExpiresAt": { $gt: Date.now() },
    });

    if (!user) {
      return sendResponse(res, null, "Invalid or expired token", false);
    }

    user.email.verified = true;
    user.email.verificationToken = undefined;
    user.email.verificationTokenExpiresAt = undefined;
    await user.save();

    sendResponse(res, {
      user: {
        _id: user._id,
        email: {
          verified: user.email.verified
        }
      }
    }, "Email verified successfully");

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
        user: user,
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
    console.log("Updating user profile...");
    const { firstName, lastName, username, email, profilePicture } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      console.log("User not found");
      sendResponse(res, null, "User not found", false);
      return;
    }

    if (firstName) user.name.firstName = firstName;
    if (lastName) user.name.lastName = lastName;

    let conditions = [];

    if (username && user.username !== username) {
      conditions.push({ username });
    }
    if (email && user.email !== email) {
      conditions.push({ email });
    }

    if (conditions.length > 0) {
      const existingUser = await User.findOne({
        $or: conditions,
        _id: { $ne: user._id }
      });

      if (existingUser) {
        if (username && existingUser.username === username) {
          console.log("Username already exists");
          sendResponse(res, null, "Username already exists", false);
          return;
        }
        if (email && existingUser.email === email) {
          console.log("User email already exists");
          sendResponse(res, null, "User email already exists", false);
          return;
        }
      }
      if (profilePicture && profilePicture.url) {
        user.profilePicture.url = profilePicture.url;
    }
    

      if (username && user.username !== username) {
        user.username = username;
      }
      if (email && user.email.address !== email) {
        user.email.address = email;
      }
    }

    const updatedUser = await user.save();
    console.log("User profile updated successfully");
    sendResponse(res, {
      user: updatedUser,
    }, "User profile updated successfully");
  } catch (error) {
    console.error("Error updating user profile:", error);
    next(error);
  }
});

// @desc    Reset user password
// @route   POST /api/users/reset-password
// @access  Public
const resetPassword = asyncHandler(async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ "email.address": email });

    if (!user) {
      return sendResponse(res, null, "User not found", false);
    }

    //create a reset password token and save it in the user model
    const passwordResetToken = crypto.randomBytes(20).toString("hex");
    user.password.resetToken = passwordResetToken;
    user.password.resetTokenExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // send a password reset email to the user email address
    const transporter = nodemailer.createTransport({
      host: 'smtp.elasticemail.com',
      port: 2525,
      auth: {
        user: process.env.ELASTIC_EMAIL_USERNAME,
        pass: process.env.ELASTIC_EMAIL_API_KEY,
      },
    });
    const resetPasswordURL = `${process.env.CLIENT_URL}/reset-password/${passwordResetToken}`;

    const mailOptions = {
      from: process.env.ELASTIC_EMAIL_USERNAME,
      to: email,
      subject: "Password Reset Request",
      text: `Click on the following link to reset your password: ${resetPasswordURL}`,
    };
    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.error("Error sending email:", error);
        sendResponse(res, null, "An error occurred while sending the email", false);
      } else {
        sendResponse(res, null, "Password reset email sent successfully");
      }
    });
    
  } catch (error) {
    next(error);
  }
});

// @desc    Confirm password reset and set new password
// @route   POST /api/users/confirm-reset
// @access  Public
const confirmPasswordReset = asyncHandler(async (req, res, next) => {
  try {
    const { passwordResetToken, newPassword } = req.body;
    const user = await User.findOne({
      "password.resetToken": passwordResetToken,
      "password.resetTokenExpires": { $gt: Date.now() },
    });

    if (!user) {
      return sendResponse(res, null, "Invalid or expired token", false);
    }
   

    user.password.value = newPassword;
   
    
    user.password.resetToken = undefined;
    user.password.resetTokenExpires = undefined;

    await user.save();

    sendResponse(res, null, "Password updated successfully");

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
  verifyEmail,
  confirmPasswordReset,
  resendVerificationEmail,
};
