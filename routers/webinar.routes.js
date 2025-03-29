const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware.js');
const { createWebinar, listWebinars, webinarDetails } = require('../controllers/webinar.controller.js');

const webRouter = express.Router();

webRouter.use(authMiddleware);
// Create a new webinar
webRouter.post("/", createWebinar);


// Fetch all webinars
webRouter.get("/", listWebinars);

// Fetch webinar details by ID
webRouter.get("/:id", webinarDetails);

module.exports = webRouter;