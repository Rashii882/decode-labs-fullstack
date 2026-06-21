const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

let users = [];

// GET API
app.get("/users", (req, res) => {
    res.status(200).json(users);
});

// POST API
app.post("/users", (req, res) => {

    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            message: "Name and Email are required"
        });
    }

    const newUser = {
        id: users.length + 1,
        name,
        email
    };

    users.push(newUser);

    res.status(201).json({
        message: "User added successfully",
        user: newUser
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});