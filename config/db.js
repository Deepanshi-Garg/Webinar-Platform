const mongoose = require('mongoose');
require('dotenv').config();

const DB_URL = process.env.MONGODB_URL;
const connection = mongoose.connect(DB_URL);

// const connection = async () => {
    // try {
    //     await mongoose.connect(DB_URL);
    //     console.log('connect with mongo db successfully!');
    // } catch (error) {
    //     console.log('mongo db connection failed!', error);
    // }
// }

module.exports = connection;