// Importing the express library and creating a router instance
const router = require("express").Router();

// Importing API routes from the "./api" file
const apiRoutes = require("./api");

// Using the imported apiRoutes for paths starting with "/api"
router.use("/api", apiRoutes);

// Handling any other routes with a default response of "Wrong route!"
router.use((req, res) => res.send("Wrong route!"));

// Exporting the router 
module.exports = router;
