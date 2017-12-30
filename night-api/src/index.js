import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import mongodb from 'mongodb';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import Promise from 'bluebird';
import cors from 'cors';
import morgan from 'morgan';

import data from './routes/data'; 
import auth from './routes/auth';
import users from './routes/users';

dotenv.config();

const app = express();
// app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

// mongoose.Promise = global.Promise *fix mpromise issue without bluebird
mongoose.Promise = Promise;
const dbUrl = process.env.MONGODB_URI || process.env.MONGODB_URL;
mongoose.connect(dbUrl,
 { useMongoClient: true }).then(
 () => {console.log('mongodb running local mongodb')},
 err => {console.log('error!:', err)}
 );

app.use('/api/data', data);
app.use('/api/auth', auth);
app.use('/api/users', users);

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
})

app.listen(8080, () => console.log('Running on localhost:8080'));
