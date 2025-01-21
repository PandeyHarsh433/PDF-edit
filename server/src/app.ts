import express from 'express';
import bodyParser from 'body-parser';
import pdfRoutes from './routes/pdfRoutes';
import cors from 'cors';
import errorHandler from './middlewares/errorHandler';

const app = express();

app.use(express.json());
app.use(cors())

// Routes
app.use('/api/pdf', pdfRoutes);

// Error Handling Middleware
app.use(errorHandler);

export default app;