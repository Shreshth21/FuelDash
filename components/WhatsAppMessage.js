import axios from 'axios';

export const whatsAppMessage = async (orderId, name, quantity, phone, scheduledDate, address, longitude, latitude) => {

  const url = 'https://graph.facebook.com/v19.0/362646686931545/messages';
  const token = 'EAAf0LMFXqgsBOwipczaL6z0I9m7vR1G6qSVMZAbbToAZATika8vJ0CZAz0CILsSXh66fsSHumAB0IEoXxdSeXu11f5JZCUX9RobWaZB0UnfzNiABeC7iqgEZBxNNE46TY4mWP9HcFMTgFHqreSGBzfcfB95qf0KNIqKZA4TJUZA8KrZA1PPRWJdAgCbSJIEn9ZA1W8tAZDZD';

  const recipient = '919998276465';
  const templateName = 'fuelorder2';

  const data = {
    messaging_product: 'whatsapp',
    to: recipient,
    type: 'template',
    template: {
      name: templateName,
      language: {
        code: 'en',
      },
      components: [
        {
          type: 'header',
          parameters: [
            {
              type: 'location',
              location: {
                latitude: latitude,
                longitude: longitude,
                name: ' ',
                address: address,
              }
            }
          ]
        },
        {
          type: 'body',
          parameters: [
            { type: 'text', text: orderId },
            { type: 'text', text: name },
            { type: 'text', text: quantity },
            { type: 'text', text: phone },
            { type: 'text', text: scheduledDate },
            { type: 'text', text: address },
          ],
        },
      ],
    },
  };
  console.log("hello!")
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