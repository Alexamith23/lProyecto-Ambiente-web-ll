const config = require("../config");
const { response } = require("express");
const client = require("twilio")(config.SID, config.TOKEN);

function createChanel(servicio,nombre) {
    const chanel = client.chat.services(servicio)
    .channels
    .create({ friendlyName: nombre })
    .then(channel => console.log(channel.sid));
    return chanel;
}


async function canalesCreados() {
  let array = [];
  const chanels = client.chat
    .services(config.Service)
    .channels.list({ limit: 20 });
  (await chanels).forEach((element) => array.push(element));
  return array;
}

function borrarCanal(chanel) {
  const response = client.chat.v1
    .services(config.Service)
    .channels(chanel)
    .remove();
  return response.sid;
}


async function editarCanal(chanel, nombre_nuevo) {
  try {
    const response = client.chat.v1
      .services(config.Service)
      .channels(chanel)
      .update({ friendlyName: nombre_nuevo })
      .then((channel) => console.log('New name '+channel.friendlyName));
    return response;
  } catch (error) {
    console.log(error);
  }
}
async function traerCanal(chanel) {
  try {
    const response = client.chat.services(config.Service).channels(chanel).fetch();
    return response;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { createChanel, canalesCreados, borrarCanal, editarCanal, traerCanal};
