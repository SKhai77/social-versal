const { Schema, model, Types } = require("mongoose");

// Schema to create Reaction
const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    Required: true,
    max_lenght: 280,
  },
    username: {
      type: String,
      Required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => new Date(timestamp).toLocaleString()
  },
});

// Schema to create Thought model
const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    min_lenght: 1,
    max_lenght: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => new Date(timestamp).toLocaleString(),
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
});

// Virtual to get the reactionCount
thoughtSchema.virtual('reactionCount').get(function () {
return this.reactions.lenght;
})

// Initialize the Thought model
const Thought = model("Thought", thoughtSchema);

// Export the Thought model
module.exports = Thought;