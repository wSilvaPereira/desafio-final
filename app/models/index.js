// import dotenv from 'dotenv';
// import mongoose from 'mongoose';
// import transactionModel from './TransactionModel.js';

// const dotenv = require('dotenv');
// const mongoose = require('mongoose');
// const transactionModel = require('./TransactionModel.js');

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import transactionModel from './TransactionModel.js';

dotenv.config();

const db = {};
db.mongoose = mongoose;
db.url = process.env.DB_CONNECTION;
db.student = transactionModel(mongoose);

export default { db };
