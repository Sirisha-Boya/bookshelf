const express = require("express");
const connectDB = require("./dbConfig");
const User = require("./models/userSchema");

const app = express();

const port = process.env.PORT || 3002;

connectDB();
app.use(express.json());

// Create a new user
// app.post('/users', async (req, res) => {
//   try {
//     const {email, password } = req.body;

//     const user = new User({
//       email,
//       password,
//     });

//     await user.save();

//     res.status(201).json(user);
//   } catch (error) {
//     console.error('Error creating user:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });
app.post('/users', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if a user with the given email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // User exists, treat it as a login operation
      // You can implement your authentication logic here
      res.json({ message: 'Login successful' });
    } else {
      // User doesn't exist, treat it as a registration operation
      const user = new User({
        email,
        password,
      });

      await user.save();

      res.status(201).json({ message: 'Registration successful' });
    }
  } catch (error) {
    console.error('Error creating or logging in user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();

    res.json(users);
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// app.listen(port, () => {
//   console.log("Server Connected to port " + port);
// });
