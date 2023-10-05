import express from 'express';
import * as dotenv from 'dotenv';
import 'colors';
import { errorHandler } from './middleware/errorMiddleware';
import connectDB from './config/db';
dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const port: number = parseInt(process.env.PORT as string, 10) || 3000;

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/feed', require('./routes/feedRoutes'));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`.green);
});
