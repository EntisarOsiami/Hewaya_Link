import asyncHandler from "express-async-handler";
import User from "../models/userModels.js";
import generateToken from "../Utils/generateToken.js";

// @desc    login user & get token
// @route   POST /api/user/login
// @access  Public

const loginUser = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      const token = generateToken(res, user._id); 

      res.json({
        success: true,
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
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
    const { name, email, password, birthDate } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({
        success: false,
        message: "User already exists",
      });
    } else {
      const user = await User.create({
        name,
        email,
        password,
        birthDate,
      });

        if (user) {
          const token = generateToken(res, user._id);

        res.status(201).json({
          success: true,
          token,
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            birthDate: user.birthDate,
            role: user.role,
          },
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Invalid user data",
        });
      }
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
    // Clear the JWT cookie
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });

  

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error logging out:", error);
    res.status(500).json({ message: "An error occurred while logging out" });
  }
};


// @desc    Get user profile
// @route   GET /api/user/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      res.status(200).json({
        success: true,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          dateOfBirth: user.dateOfBirth,
        },
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    next(error);
  }
});


// @desc    Update user profile
// @route   PUT /api/user/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    user.name = name || user.name;
    user.email = email || user.email;

    if (password) {
       user.password = await bcrypt.hash(password, 10);
    }

    if (email && user.email !== email) {
      const userExists = await User.findOne({ email });
      if (userExists) {
        res.status(400).json({
          success: false,
          message: "User Email Already Exists",
        });
        return;
      }
      user.email = email;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        dateOfBirth: updatedUser.dateOfBirth,
      },
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
};
