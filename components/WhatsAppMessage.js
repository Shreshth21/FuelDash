import axios from 'axios';

export const whatsAppMessage = async () => {

  const url = 'https://graph.facebook.com/v19.0/362646686931545/messages';
  const token = 'EAAf0LMFXqgsBOwprpfsV99JOcIZChujvbpY3npJyAR9Sb3fsZC8RG9EQuCuiQGmvLKnZAbFyvfBIId5oXvGvZAN94tVBZAi1wzZBBgIBlMZAlORjaQ09o5aQdSkGWLMndOjOAdNpqhcdinRuYZBwS96ZCf4FWZAHFWMBZCYLBiMwg5g7avIZAnhfGUnqsFY3pc7PUBCHOte9WAtU8ZBFYTkd96GEt';
  const recipient = '918460835256';
  const templateName = 'fuelorder';

  const data = {
    messaging_product: 'whatsapp',
    to: recipient,
    type: 'template',
    template: {
      name: templateName,
      language: {
        code: 'en_US',
      },
    },
  };

  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  axios.post(url, data, { headers })
    .then(response => {
      console.log('Message sent successfully:', response.data);
    })
    .catch(error => {
      console.error('Error sending message:', error);
    });
};