const WebinarModel = require('../models/webinar.model.js');

const createWebinar = async (req, res) => {
    try {
        const { title, description, date, duration } = req.body;
        const host = req.user.id;

        if(req.user.role !== "host") return res.status(401).json({ message: "authorization denied" });
        if (!title || !date || !duration) return res.status(400).json({ message: "Missing required fields" });
        
        const exist = await WebinarModel.findOne({title, host});
        if (exist) return res.status(401).json({ message: "webinar already exists" });

        const newWebinar = new WebinarModel({ title, description, date, duration, host });
        await newWebinar.save();

        res.status(201).json({ message: "Webinar created successfully", webinar: newWebinar });
    } catch (error) {
        res.status(500).json({ message: "Error creating webinar", error });
    }
}

const listWebinars = async (req, res) => {
    try {
        const webinars = await WebinarModel.find().populate("host", "name email");

        if (!webinars) res.status(404).json({ message: "No webinars found!" });

        res.status(200).json(webinars);
    } catch (error) {
        res.status(500).json({ message: "Error fetching webinars", error });
    }
}

const webinarDetails = async (req, res) => {
  try {
    const webinarId = req.params.id;
    const webinar = await WebinarModel.findById(webinarId).populate("host", "name email");

    if (!webinar) return res.status(404).json({ message: "Webinar not found" });

    res.status(200).json(webinar);
  } catch (error) {
    res.status(500).json({ message: "Error fetching webinar details", error });
  }
}

module.exports = { createWebinar, listWebinars, webinarDetails };