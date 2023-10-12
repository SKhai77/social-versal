const { Schema, model, Types } = require("mongoose");
// Importing dayjs
const dayjs = require("dayjs");

// Schema to create Reaction
const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => dayjs().toDate(),
    get: (timestamp) => dayjs(timestamp).format("MMM DD, YYYY HH:mm:ss"),
  },
});

// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: () => dayjs().toDate(),
      get: (timestamp) => dayjs(timestamp).format("MMM DD, YYYY HH:mm:ss"),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [
      {
        reactionBody: {
          type: String,
          required: true,
          maxlength: 280,
        },
        username: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Virtual to get the reaction count
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// Initialize the Thought model
const Thought = model("Thought", thoughtSchema);

// Export the Thought model
module.exports = Thought;
