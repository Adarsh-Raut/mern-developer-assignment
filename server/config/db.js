import mongoose from 'mongoose';

const db = mongoose.connect('mongodb://localhost:27017/react-flow');

export default db;