const { User, Thought } = require("../models");

module.exports = {
  // GET all users
  async getUsers(req, res) {
    try {
      const users = await User.find().populate("thoughts").populate("friends");
      res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err: "Failed to get users" });
    }
  },
  // GET a single user by its _id
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select("-__v")
        .populate("thoughts")
        .populate("friends");

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }
      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // POST to create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // PUT to update a user its _id
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { new: true }
      );
      if (!user) {
        res.status(404).json({ message: "No user with this id!" });
      }

      res.json(user);
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ error: err.message || "Internal Server Error" });
    }
  },

  // DELETE to remove user by its _id
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: "No such user exists" });
      }

      const thoughtDeleteResult = await Thought.deleteMany({
        users: req.params.userId,
      });

      if (!thoughtDeleteResult || thoughtDeleteResult.deletedCount === 0) {
        return res.status(404).json({
          message: "User deleted, but no thoughts were found to delete",
        });
      }

      res.json({ message: "User successfully deleted" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message || "Internal Server Error" });
    }
  },

  // POST to add a new friend to a user's friend list
  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: "No user found with that ID :(" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // DELETE to remove a friend from a user's friend list
  async removeFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: "No user found with that ID :(" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
