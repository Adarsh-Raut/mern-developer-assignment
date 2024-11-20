import Agenda from 'agenda';
import dotenv from 'dotenv';
dotenv.config();

const MongodbUrl= process.env.MONGO_DB_URL

const agenda = new Agenda({
  db: { address: `${MongodbUrl}` }, 
  processEvery: '1 minute',
});

export default agenda;