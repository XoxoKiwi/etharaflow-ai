const User = require("../models/User");

// GET ALL USERS
exports.getUsers = async (req, res) => {
  try {

    const users = await User.find({})
      .select("_id name email role")
      .sort({ createdAt: -1 });

    res.status(200).json(users);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};