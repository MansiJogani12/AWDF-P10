const express = require('express');
const app = express();

app.use(express.json());

// In-memory database
let database = [
    { id: 1, name: 'John Doe', age: 25 },
    { id: 2, name: 'Jane Smith', age: 30 }
];

// CREATE
app.post('/users', (req, res) => {
    const newUser = {
        id: database.length + 1,
        name: req.body.name,
        age: req.body.age
    };

    database.push(newUser);
    res.status(201).json(newUser);
});

// READ ALL
app.get('/users', (req, res) => {
    res.json(database);
});

// READ ONE
app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = database.find(u => u.id === userId);

    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// UPDATE
app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = database.findIndex(u => u.id === userId);

    if (userIndex !== -1) {
        database[userIndex] = {
            ...database[userIndex],
            ...req.body
        };

        res.json(database[userIndex]);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// DELETE
app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = database.findIndex(u => u.id === userId);

    if (userIndex !== -1) {
        const deletedUser = database.splice(userIndex, 1);
        res.json(deletedUser);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// Start server
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});