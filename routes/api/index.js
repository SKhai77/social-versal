// Importing the express library and creating a router instance
const router = require("express").Router();

// Importing routes for handling thoughts and users
const thoughtRoutes = require("./thoughtRoutes");
const userRoutes = require("./userRoutes");

// Using the thoughtRoutes for paths starting with "/thoughts"
router.use("/thoughts", thoughtRoutes);

// Using the userRoutes for paths starting with "/users"
router.use("/users", userRoutes);

// Exporting the router
module.exports = router;
