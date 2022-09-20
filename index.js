const { req, res, json } = require('express')
const express = require('express')
const uuid = require('uuid')
const cors = require('cors')

const port = 3001;
const app = express();
app.use(express.json());
app.use(cors());


const users = [];



const checkUserId = (req, res, next) => {
    const { id } = req.params;

    const index = users.findIndex(user => user.id === id);

    if (index < 0) {
        return res.status(404).json({ error: "User not found" });
    }

    req.userIndex = index;
    req.userId = id;

    next();
};


app.get('/users', (req, res) => {
    const { name, age } = req.query
    return res.json(users);
});

app.post('/users', (req, res) => {
    const { name, age } = req.body;
    const user = { name, age, id: uuid.v4() };

    users.push(user)
    return res.status(201).json(user);
})

app.put('/users/:id', checkUserId, (req, res) => {
    const { name, age } = req.body;
    const index = req.userIndex;
    const id = req.userId;

    const updatedUser = { name, age, id };

    users[index] = updatedUser;

    return res.json(updatedUser);
})

app.delete('/users/:id', checkUserId, (req, res) => {
    const index = req.userIndex

    users.splice(index, 1)

    return res.status(204).json();
});


app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})

















