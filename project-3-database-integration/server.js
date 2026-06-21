const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
require('dotenv').config();
const dns = require('dns');

dns.setServers(['8.8.8.8', '1.1.1.1']);

const User = require("./models/User");

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

app.post("/users", async (req, res) => {

    try {

        const user = new User(req.body);

        await user.save();

        res.status(201).json(user);

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }
});

app.get("/users", async (req, res) => {

    const users = await User.find();

    res.json(users);

});

app.put("/users/:id", async (req, res) => {

    const user = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.json(user);

});

app.delete("/users/:id", async (req, res) => {

    await User.findByIdAndDelete(req.params.id);

    res.json({
        message: "User Deleted"
    });

});

app.listen(process.env.PORT, () => {
    console.log("Server Running");
});