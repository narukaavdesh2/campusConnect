import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import filterRoutes from './routes/filter.route.js';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import postRouter from './routes/post.route.js'; // <-- add this
import cookieParser from 'cookie-parser';
import path from 'path';




const __dirname = path.resolve();
const app = express();

app.use(express.json());
app.use(cookieParser());


mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
  });

// routes
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/filter', filterRoutes);
app.use('/api/post', postRouter); // <-- add this

// // static files
// app.use(express.static(path.join(__dirname, '/client/dist')));

// // fallback
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
// });

// error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// start server
app.listen(5000, () => {
  console.log('Server is running on port 5000!');
});
