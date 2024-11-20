
const emailTemplates = {
    
    aiAssisted: () => {
      return `
        Subject: Unlock the Power of AI to Boost Your Business
  
        Dear client,
  
        I hope this email finds you well. My name is [Your Name], and I'm reaching out because I believe your business could greatly benefit from the cutting-edge AI solutions we provide. Our services are designed to streamline your operations, enhance efficiency, and unlock valuable insights for growth.
  
        I’d love the opportunity to discuss how we can work together to drive success. Let’s schedule a quick call or meeting at your convenience. 
  
        Looking forward to hearing from you!
  
        Best regards,
        [Your Name]
        [Your Position]
        [Company Name]
        [Contact Information]
      `;
    },

    followUpAi: () => {
      return `
        Subject: Just Following Up on Our Last Conversation
  
        Hi client,
  
        I hope you're doing well. I wanted to follow up on my previous email regarding the proposal I sent you last week. I understand that you’ve been busy, but I just wanted to check in and see if you had any questions or if you'd like to discuss the next steps.
  
        We believe our AI solutions could be a perfect fit for your business, and we’re excited about the opportunity to collaborate with you.
  
        Please let me know if you'd be available for a quick chat, or if there’s any additional information I can provide.
  
        Best regards,
        [Your Name]
        [Your Position]
        [Company Name]
        [Contact Information]
      `;
    },
  
 
    greetingsAi: () => {
      return `
        Subject: Warm Greetings!
  
        Hi client,
  
        I just wanted to take a moment to wish you a very happy birthday 🎉
  
        On behalf of everyone at [Your Company], we hope you have a wonderful time celebrating. May this occasion bring you joy, success, and lots of cherished moments with your loved ones.
  
        If there's anything we can assist you with, please don't hesitate to reach out. We look forward to continuing our work together in the future!
  
        Best wishes,
        [Your Name]
        [Your Position]
        [Company Name]
        [Contact Information]
      `;
    }
  };
  
  export default emailTemplates;
  