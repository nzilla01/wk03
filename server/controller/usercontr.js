const User = require('../schema/users');

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const userData = await User.findById(id);
    if (!userData) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send(userData);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Add new user
const addUser = async (req, res) => {
  const {
    firstName,
    lastName,
    userName,
    email,
    birthday,
    favouriteColor,
    role,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !userName ||
    !email ||
    !birthday ||
    !favouriteColor ||
    !role
  ) {
    return res.status(400).send({ message: 'All fields are required.' });
  }

  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).send(savedUser);
    console.log('User added successfully');
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(400).send({ message: error.message });
  }
};

// Update user
const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).send({ message: 'Update data is required.' });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).send({ message: 'User not found' });
    }

    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
};
