const config = require("../config");
const { response } = require("express");
const client = require("twilio")(config.SID, config.TOKEN);

async function unirse(chanel, aka) {
  try {
    array = [];
    const response = client.chat
      .services("IS3ed18df849e34ebea8471e84f1b65fa4")
      .channels(chanel)
      .members.create({ identity: aka });
      //.then((member) => console.log(member.sid));
      console.log("sid "+(await response).sid);
      array.push((await response).sid);
      array.push((await response).identity);
    return array;
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
      .messages.list();
    (await response).forEach((element) => array.push(element));
    return array;
  } catch (error) {
    console.log(error);
  }
}

async function enviarSMS(chanel, sms, autor) {
  let now= new Date();
  console.log('La fecha actual es',now);
  try {
    client.chat
      .services("IS3ed18df849e34ebea8471e84f1b65fa4")
      .channels(chanel)
      .messages.create({ body: sms, from:autor, dateCreated:now })
      .then((message) => console.log(message.sid));
  } catch (error) {
    console.log(error);
  }
}



async function recibir(chanel, sms, autor) {
  let now= new Date();
  console.log('La fecha actual es',now);
  try {
    client.chat
      .services("IS3ed18df849e34ebea8471e84f1b65fa4")
      .channels(chanel)
      .messages.create({ body: sms, from:autor, dateCreated:now })
      .then((message) => console.log(message.sid));
  } catch (error) {
    console.log(error);
  }
}
module.exports = { unirse, miembros, lista_de_mensajes, enviarSMS };
