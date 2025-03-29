const express = require("express");
const connection = require("./config/db.js");
const webRouter = require("./routers/webinar.routes.js");
const userRouter = require("./routers/user.routes.js");
require('dotenv').config();

const port = process.env.PORT;
const app = express();

app.use(express.json());

app.use('/webinar', webRouter);
app.use('/user', userRouter);

app.listen(port, async()=> {
    try {
        await connection;
        console.log('connect with mongo db successfully!');
    } catch (error) {
        console.log('mongo db connection failed!', error);
    }
    console.log('server running at port: ',port);
});