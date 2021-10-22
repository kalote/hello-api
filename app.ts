import express from 'express';
import morgan from 'morgan';
import healthRouter from './api/meta';
import helloRouter from './api/hello';
import mongoose from 'mongoose';

const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/hello-api';

mongoose.connect(MONGO_URL, () => {
  console.log('connected to DB');
});

// parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// disable morgan logs during test
if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'));

// Main Routes
app.use('/_meta', healthRouter);
app.use('/hello', helloRouter);

app.listen(PORT, () => {
  console.log(`API started on port ${PORT}`);
});

export default app;
