const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;
const User = require('./models/User');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/crudDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

  // CREATE
app.post('/users', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send(user);
});

// READ
app.get('/users', async (req, res) => {
  const users = await User.find();
  res.send(users);
});

// UPDATE
app.put('/users/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(user);
});

// DELETE
app.delete('/users/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.send({ message: 'User deleted' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
