import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/auth';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

(mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:7777', {
    useNewUrlParser: true,
    useUnifiedTopology: true
} as ConnectOptions) as Promise<typeof import("mongoose")>)
.then(() => console.log('Connected to MongoDB'))
.catch((error: Error) => console.error('Error connecting to MongoDB:', error));

app.get('/', (req: Request, res: Response) => {
    res.send('Great! The API is working');
});

app.use('/api/auth', authRoutes);
app.use('/api/auth/users', authRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
