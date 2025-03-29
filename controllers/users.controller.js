const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/users.model.js");
require('dotenv').config();

const userSignup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password) return res.status(400).json({ message: "Missing required fields" });

        let user = await UserModel.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = role ? new UserModel({ name, email, password: hashedPassword, role }) : new UserModel({ name, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
        console.log('User signup failed : ', err.message);
    }
};

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: "Missing required fields" });
        const user = await UserModel.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const accessToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);

        res.json({ message: 'user logged in successfully!', accessToken, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
        console.log('User login failed : ', err.message);
    }
};

module.exports = { userSignup, userLogin };