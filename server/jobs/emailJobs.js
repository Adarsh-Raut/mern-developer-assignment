import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'ellie.dibbert76@ethereal.email',
      pass: 'WT8SXr6rPtTbRUfzA1'
  }
});


 const emailJobs = (agenda) => {
  agenda.define('send email', async (job) => {
    const { email, subject, body } = job.attrs.data;

    try {
      await transporter.sendMail({
        from: 'ellie.dibbert76@ethereal.email', 
        to: email,
        subject: subject || 'Default Subject',
        text: body || 'Default Body',
        html: "<b>Hello world?</b>", 

      });

      console.log(`Email sent to ${email}`);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  });
};

export default emailJobs