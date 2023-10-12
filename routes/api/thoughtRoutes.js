// Importing the express library and creating a router instance
const router = require("express").Router();
// Importing controller functions for handling thought-related operations
const { getThoughts, getSingleThought, createThought, updateThought, deleteThought, addUserToThought, removeUserFromThought, createReaction, deleteReaction } = require("../../controllers/thoughtController");

// Defining routes for handling GET, POST, PUT, and DELETE requests
router.route("/").get(getThoughts).post(createThought);
router.route("/:thoughtId").get(getSingleThought).put(updateThought).delete(deleteThought);
router.route("/:thoughtId/users/:userId").post(addUserToThought).delete(removeUserFromThought);
router.route("/:thoughtId/reactions").post(createReaction);
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

// Exporting the router
module.exports = router;
