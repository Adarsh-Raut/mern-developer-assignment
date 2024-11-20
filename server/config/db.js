import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MongodbUrl= process.env.MONGO_DB_URL

const db = mongoose.connect(`${MongodbUrl}`);

export default db;