const config = require("../config");
const { response } = require("express");
const client = require("twilio")(config.SID, config.TOKEN);

async function unirse(chanel, aka) {
  try {
    const response = client.chat
      .services("IS3ed18df849e34ebea8471e84f1b65fa4")
      .channels(chanel)
      .members.create({ identity: aka })
      .then((member) => console.log(member.sid));
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function miembros(chanel) {
  let array = [];
  try {
    const response = client.chat
      .services("IS3ed18df849e34ebea8471e84f1b65fa4")
      .channels(chanel)
      .members.list({ limit: 20 });
    (await response).forEach((element) => array.push(element));
    return array;
  } catch (error) {
    console.log(error);
  }
}

async function lista_de_mensajes(chanel) {
  let array = [];
  try {
    const response = client.chat
      .services("IS3ed18df849e34ebea8471e84f1b65fa4")
      .channels(chanel)
      .messages.list({ limit: 20 });
    (await response).forEach((element) => array.push(element));
    return array;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { unirse, miembros, lista_de_mensajes };
