import express from 'express';
import morgan from 'morgan';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

const listen = app.listen(PORT, () => {
  console.log(`API started on port ${PORT}`);
});

export { listen, PORT };
