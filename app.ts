import express from 'express';
import morgan from 'morgan';
import healthRouter from './api/meta';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/_meta', healthRouter);

app.listen(PORT, () => {
  console.log(`API started on port ${PORT}`);
});

export default app;
