// Importing the express library and creating a router instance
const router = require("express").Router();
// Importing controller functions for handling user-related operations
const { getUsers, getSingleUser, createUser, updateUser, deleteUser, addFriend, removeFriend } = require("../../controllers/userController");

// Defining routes for handling GET, POST, PUT, and DELETE requests at the root ("/") endpoint
router.route("/").get(getUsers).post(createUser);
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);
router.route("/:userId/friends").post(addFriend).delete(removeFriend);

// Exporting the router
module.exports = router;
