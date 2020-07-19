const config = require('../config');
const client = require('twilio')(config.SID, config.TOKEN);


async function sendMessage(mensaje, numero) {
    try {
        const sms = await client.messages.create({
            to:numero,
            from:'+12055390209',
            body:mensaje
        }) 
        return sms;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {sendMessage}