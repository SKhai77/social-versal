// Importing the express library and creating a router instance
const router = require("express").Router();
// Importing controller functions for handling user-related operations
const { getUsers, createUser } = require("../../controllers/userController");

// Defining routes for handling GET and POST requests at the root ("/") endpoint
router.route("/").get(getUsers).post(createUser);

// Exporting the router
module.exports = router;
