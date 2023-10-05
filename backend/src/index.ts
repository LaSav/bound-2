// const express = require('express');
// const dotenv = require('dotenv').config();
// const colors = require('colors');
// const { errorHandler } = require('./middleware/errorMiddleware');
// const connectDB = require('./config/db');

import * as dotenv from 'dotenv';
import express from 'express';
dotenv.config();

// const port = process.env.PORT || 3000;

// const app = express();

// connectDB();

if (!process.env.PORT) {
  process.exit(1);
}

const port: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use('/api/feed', require('./routes/feedRoutes'));

// app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
