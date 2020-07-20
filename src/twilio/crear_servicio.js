// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
const config = require("../config");
const { response } = require("express");
const client = require("twilio")(config.SID, config.TOKEN);

function createService() {
    const ser = client.chat.services.create({friendlyName: 'friendly_name'}).then(service => console.log(service.sid));
    return ser;
}


async function login(user, password) {
    if(user == 'administrador' && password == '123'){
        return true;
    }else{
        return false;
    }
}


async function obtenerServicios() {
    var x = client.chat.services.list({limit: 20});
    let servi = (await x).length;
    return servi;
}

async function listarServiciosCreados() {
    client.chat.services.list({limit: 20}).then(services => services.forEach(s => console.log(s.sid)));
}



module.exports = { createService, login, obtenerServicios,listarServiciosCreados};