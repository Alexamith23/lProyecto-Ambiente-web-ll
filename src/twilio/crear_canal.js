const config = require("../config");
const { response } = require("express");
const client = require("twilio")(config.SID, config.TOKEN);

function createChanel(servicio) {
    const chanel = client.chat.services(servicio)
    .channels
    .create()
    .then(channel => console.log(channel.sid));
    return chanel;
}

async function canalesCreados() {
    let array =[];
    const chanels = client.chat.
    services('IS3ed18df849e34ebea8471e84f1b65fa4')
    .channels
    .list({limit: 20});
    (await chanels).forEach(element => array.push(element.sid));
    return array;
}




module.exports = {createChanel, canalesCreados}