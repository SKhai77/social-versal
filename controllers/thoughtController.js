const { Thought, User } = require("../models");

module.exports = {
  // GET all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find().populate("users");
      res.json(thoughts);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Failed to get thoughts" });
    }
  },

  // GET a single thought by its _id
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .select("-__v")
        .populate("users");

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // POST to create a new thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // PUT to update a thought by its _id
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { new: true }
      );

      if (!thought) {
        res.status(404).json({ message: "No thought with this id!" });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // DELETE to remove a thought by its _id
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: "No such thought exists" });
      }

      res.json({ message: "Thought successfully deleted" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message || "Internal Server Error" });
    }
  },

  // POST to add a user to a thought's user list
  async addUserToThought(req, res) {
    const { thoughtId, userId } = req.params;

    try {
      const thought = await Thought.findByIdAndUpdate(
        thoughtId,
        { $addToSet: { users: userId } },
        { new: true }
      ).populate("users");

      if (!thought) {
        return res.status(404).json({ message: "No thought found with that ID :(" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // DELETE to remove a user from a thought's user list
  async removeUserFromThought(req, res) {
    const { thoughtId, userId } = req.params;

    try {
      const thought = await Thought.findByIdAndUpdate(
        thoughtId,
        { $pull: { users: userId } },
        { new: true }
      ).populate("users");

      if (!thought) {
        return res.status(404).json({ message: "No thought found with that ID :(" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // POST to create a reaction for a thought
  async createReaction(req, res) {
    const { thoughtId } = req.params;
    const { reactionBody, username } = req.body;

    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        thoughtId,
        { $push: { reactions: { reactionBody, username } } },
        { new: true }
      ).populate("users");

      if (!updatedThought) {
        return res.status(404).json({ message: "No thought found with that ID :(" });
      }

      res.json(updatedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // DELETE to remove a reaction from a thought
  async deleteReaction(req, res) {
    const { thoughtId, reactionId } = req.params;

    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        thoughtId,
        { $pull: { reactions: { _id: reactionId } } },
        { new: true }
      ).populate("users");

      if (!updatedThought) {
        return res.status(404).json({ message: "No thought found with that ID :(" });
      }

      res.json(updatedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
