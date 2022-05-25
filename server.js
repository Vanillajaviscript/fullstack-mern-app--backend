require('dotenv').config();
const express = require('express');
const app = express();
const logger = require('morgan');
const PORT = process.env.PORT || 3001;
const cors = require('cors');

app.use(express.json());
app.use(logger('dev'));
app.use(cors())

app.get('/', (req, res) => {
  res.json("root directory")
});

app.listen(PORT, () => {
  console.log(`Server is live on ${PORT}`)
});