// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

// Initialize Express app
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/blog_app', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Define user schema and model
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String
});
const User = mongoose.model('User', userSchema);

// Middleware for user authentication
const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'Token is required' });

    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Invalid token' });
        req.user = decoded.user;
        next();
    });
};

// Route for user signup
app.post('/signup', [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({ username: req.body.username, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route for user login
app.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return res.status(401).json({ message: 'Invalid username or password' });

        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: 'Invalid username or password' });

        const token = jwt.sign({ user: user._id }, 'secret');
        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route for creating blog posts (requires authentication)
app.post('/posts', authenticateUser, (req, res) => {
    // Logic for creating blog posts
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
