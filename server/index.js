import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import agenda from "./config/agenda.js";
import emailJobs from "./jobs/emailJobs.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors())


app.use(bodyParser.json());

emailJobs(agenda);


agenda.start().then(() => console.log('Agenda started'));

app.post('/schedule', async (req, res) => {
  const { coldEmails, wait, leadSources } = req.body;

  try {
    for (const coldEmail of coldEmails) {
      const email = coldEmail.email;


      await agenda.schedule('now', 'send email', {
        email,
        subject: 'Hello from Cold Email',
        body: 'This is a cold email!',
      });
    }

    for (const waitTask of wait) {
      const { waitTime, timeUnit } = waitTask;


      await agenda.schedule(`${waitTime} ${timeUnit}`, 'send email', {
        email: leadSources[0].email,
        subject: 'Follow-Up Email',
        body: 'This is a follow-up email after the wait time!',
      });
    }

    res.status(200).send('Jobs scheduled successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error scheduling jobs.');
  }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
