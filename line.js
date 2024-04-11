const https = require('https');

const accessToken = '';

const message = 'Easy Spam by: https://pr-apimile.online/';

const options = {
  hostname: 'notify-api.line.me',
  path: '/api/notify',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': `Bearer ${accessToken}`
  }
};

const data = new URLSearchParams({
  message: message
});

function sendMessage() {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let responseBody = '';
      res.on('data', (chunk) => {
        responseBody += chunk;
      });
      res.on('end', () => {
        resolve(responseBody);
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(data.toString());
    req.end();
  });
}

async function sendMessages() {
  try {
    const promises = [];
    for (let i = 0; i < 100; i++) {
      promises.push(sendMessage());
    }
    await Promise.all(promises);
    console.log('All messages sent successfully.');
  } catch (error) {
    console.error('Error sending messages:', error);
  }
}

sendMessages();
