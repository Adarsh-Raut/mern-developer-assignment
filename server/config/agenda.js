import Agenda from 'agenda';


const agenda = new Agenda({
  db: { address: 'mongodb://localhost:27017/agenda-example' }, 
  processEvery: '1 minute',
});

export default agenda;