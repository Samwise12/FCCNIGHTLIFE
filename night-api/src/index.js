import express from 'express';
import "babel-polyfill";
import path from 'path';
import bodyParser from 'body-parser';
if (process.env.NODE_ENV !== 'production'){
	const dotenv = require('dotenv');
}
import mongoose from 'mongoose';
import mongodb from 'mongodb';
// import Promise from 'bluebird';
import cors from 'cors';
import morgan from 'morgan';

if (process.env.NODE_ENV !== 'production'){require('dotenv').config()}
const PORT = process.env.PORT || 5000;

import data from './routes/data'; 
import auth from './routes/auth';
import users from './routes/users';


const app = express();
app.use(morgan('combined'));
app.use(express.static(path.resolve(__dirname, '../../night-react/build')));
app.use(bodyParser.json());
app.use(cors());

mongoose.Promise = global.Promise *fix mpromise issue without bluebird
// mongoose.Promise = Promise;
process.on('unhandledRejection', error => {
  // Will print "unhandledRejection err is not defined"
  console.log('unhandledRejection', error.message);
});

new Promise((_, reject) => reject(new Error('woops'))).
  catch(error => {
    // Will not execute
    console.log('caught', err.message);
  });
const dbUrl = process.env.MONGODB_URI /*|| process.env.MONGODB_URL*/;

mongoose.connect(dbUrl,
 { useMongoClient: true }).then(
 () => {console.log('mongodb running local mongodb')},
 err => {console.log('error!:', err)}
 );

app.use('/api/data', data);
app.use('/api/auth', auth);
app.use('/api/users', users);

app.get('*', (req, res) => {
	// res.sendFile(path.join(__dirname, 'index.html'));
    res.sendFile(path.resolve(__dirname, '../../night-react/build', 'index.html'));	
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
