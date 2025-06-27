import axios from 'axios';

export const whatsAppMessage = async (orderId, name, quantity, phone, scheduledDate, address, longitude, latitude) => {

  const url = 'https://graph.facebook.com/v22.0/609422432264836/messages';

  const token =
    'EAAdcZB6VJnXgBOxYEn3YY871H0XSpmoQoWjoyHDgakXlddTXRCHrdMdZCRx3FopQWxx24e2kmzrwtfnjEchjOp8F9MLxtCL8ABsChtGTBt4ZACDQRfiZCzqzb6m3L9ibJbQ0ZB7403L5ZBikgYUOZB0W1Ae1ZAfnGEU9B5fDtIdMDBXraDakADTawANnrQIEtAZDZD';

  const recipient = '916354422732';
  const templateName = 'fuelorder';

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
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  axios.post(url, data, { headers })
    .then(response => {
      console.log('Message sent successfully:', response?.data);
    })
    .catch(error => {
      console.error('Error sending message:', error);
    });

};
