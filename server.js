require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT
const logger = require('morgan');
const cors = require('cors');
require('./config/config');
const mongoose = require('mongoose');

//Schema
const PeopleSchema = new mongoose.Schema({
  name: String,
  image: String,
  title: String
});

const People = mongoose.model('People', PeopleSchema)

app.use(express.json());
app.use(logger('dev'));
app.use(cors())

//Routes
app.get('/', (req, res) => {
  res.json("root directory")
});

//IDUCS
//Index
app.get('/people', async (req, res) => {
  try {
    res.json(await People.find({}))
  } catch (error) {
    res.status(400).json(error);
  }
})

//Delete
app.delete('/people/:id', async (req, res) => {
  try {
    res.json( await People.findByIdAndDelete(req.body.id))
  } catch (error) {
    res.status(400).json(error)
  }
})
//Update
app.put('/people/:id', async (req, res) => {
  try {
    res.json( await People.findByIdAndUpdate(req.body.id, req.body, {new: true}))
  } catch (error) {
    res.status(400).json(error)
  }
})

//Create
app.post('/people', async (req, res) => {
  try {
    res.json( await People.create(req.body))
  } catch (error) {
    res.status(400).json(error);
  }
})

//Show
app.get('/people/:id', async (req, res) => {
  try {
    res.json( await People.findById(req.params.id))
  } catch (error) {
    res.status(400).json(error);
  }
})
app.listen(PORT, () => {
  console.log(`Server is live on ${PORT}`)
});