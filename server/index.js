import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import agenda from "./config/agenda.js";
import emailJobs from "./jobs/emailJobs.js";
import emailList from './emailList.js';
import emailTemplates from './templateList.js';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors())


app.use(bodyParser.json());

emailJobs(agenda);


agenda.start().then(() => console.log('Agenda started'));


app.post('/schedule', async (req, res) => {
  const { coldEmails, wait, leadSources } = req.body;

  try {
    for (const email of emailList) {
      console.log(coldEmails[0]?.template)
      const templateName = coldEmails[0]?.template; 
      const templateFunction = emailTemplates[templateName]; 

      if (!templateFunction) {
        throw new Error(`Template "${templateName}" not found.`);
      }

      const emailBody = templateFunction(); 
      await agenda.schedule('now', 'send email', {
        email,
        subject: 'Cold Email Campaign',
        body: emailBody,
      });
    }

 
    for (const waitTask of wait) {
      const { waitTime, timeUnit } = waitTask;
      const leadSource = leadSources[0]; 
      const templateName = leadSource?.template; 
      const templateFunction = emailTemplates[templateName]; 

      if (!templateFunction) {
        throw new Error(`Template "${templateName}" not found.`);
      }

      const emailBody = templateFunction(); 
      await agenda.schedule(`${waitTime} ${timeUnit}`, 'send email', {
        email: leadSource.email || emailList[0], 
        subject: 'Follow-Up Email',
        body: emailBody,
      });
    }

    res.status(200).send('Jobs scheduled successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send(`Error scheduling jobs: ${error.message}`);
  }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
