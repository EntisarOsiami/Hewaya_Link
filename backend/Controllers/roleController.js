import asyncHandler from 'express-async-handler';
import User from '../models/userModels.js';

const getUserRole = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const user = await User.findById(userId);

  if (!user) {
    res.status(404).json({ message: 'User not found' });
  } else {
    res.json({ role: user.role });
  }
});

const updateUserRole = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const { newRole } = req.body;

  const user = await User.findById(userId);

  if (!user) {
    res.status(404).json({ message: 'User not found' });
  } else {
    user.role = newRole;
    await user.save();
    res.json({ message: 'User role updated successfully' });
  }
});

const getUsersByRole = asyncHandler(async (req, res) => {
  const role = req.params.role;
  const users = await User.find({ role });

  res.json(users);
});

export { getUserRole, updateUserRole, getUsersByRole };
