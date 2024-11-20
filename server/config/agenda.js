import Agenda from 'agenda';


const agenda = new Agenda({
  db: { address: 'mongodb://localhost:27017/react-flow' }, 
  processEvery: '1 minute',
});

export default agenda;