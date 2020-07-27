const { Router } = require("express");
const router = Router();
const { sendMessage } = require("../twilio/send-sms");
const { createService } = require("../twilio/crear_servicio");
const { login } = require("../twilio/crear_servicio");
const { obtenerServicios } = require("../twilio/crear_servicio");
const { listarServiciosCreados } = require("../twilio/crear_servicio");
const { createChanel } = require("../twilio/canales");
const { canalesCreados } = require("../twilio/canales");
const { borrarCanal } = require("../twilio/canales");
const { editarCanal,traerCanal } = require("../twilio/canales");
const { unirse } = require("../twilio/chatroom");
const { miembros } = require("../twilio/chatroom");
const { lista_de_mensajes } = require("../twilio/chatroom");
const { enviarSMS } = require("../twilio/chatroom");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/src/views/layouts/enviar_sms", (req, res) => {
  res.render("layouts/enviar_sms");
});

router.get("/ir_a_canales", async (req, res) => {
  const response_chanels = await canalesCreados();
  res.render("layouts/canales_cliente", { canales: response_chanels });
});

router.post("/send-sms/:canal/:sms/:usuario_added", async (req, res) => {
  await enviarSMS(req.params.canal, req.params.sms, req.params.usuario_added);
  var mensajes = await lista_de_mensajes(req.params.canal);
  res.render("layouts/enviar_sms", {
    lista_mensajes: mensajes,
    canal: req.params.chanel,
    user: req.params.user,
  });
});

router.post("/autenticate", async (req, res) => {
  var respuesta = await miembros(req.body.chanel);
  var existe = false;
  respuesta.forEach((element) => {
    var nombreNuevo = req.body.aka;
    var nombreRegistrado = element.identity;
    console.log(element.identity+" SID guardado "+element.sid+" SID enviado "+req.body.sid);
    if (nombreRegistrado == nombreNuevo && element.sid == req.body.sid) {
      existe = true;
    }
  });
  if (existe) {
    var mensajes = await lista_de_mensajes(req.body.chanel);
    var nombreCanal = traerCanal(req.body.chanel);
    var friendlyName =(await nombreCanal).friendlyName;
    res.render("layouts/enviar_sms", {
      lista_mensajes: mensajes,
      canal: req.body.chanel,
      user: req.body.aka,
      sid: req.body.sid,
      frName: friendlyName,
      miembros:respuesta
    });
  } else {
    const response_chanels = await canalesCreados();
    res.render("layouts/canales_cliente", {
      canales: response_chanels,
      negativo: "Su sid para el usuario "+req.body.aka+" no coincide",
      canal: req.body.chanel,
      aka: req.body.aka,
    });
  }
});

router.patch("/editar_canal/:sid/:nombre", async (req, res) => {
  let sid = req.params.sid;
  let nombre = req.params.nombre;
  const response = await editarCanal(sid, nombre);
});

router.post("/entrar", async (req, res) => {
  const response = await login(req.body.user, req.body.password);
  console.log(response);
  if (response) {
    const response_service = await obtenerServicios();
    if (response_service == 0) {
      console.log(createService().sid);
    }
    listarServiciosCreados();
    const response_chanels = await canalesCreados();
    res.render("layouts/dashboard", { canales: response_chanels });
  } else {
    alert("Hola");
    res.render("index", { title: "El usuario o la contraseña es incorrecto." });
  }
});

router.delete("/x/:sid", async (req, res) => {
  console.log("entra");
  let sid = req.params.sid;
  borrarCanal(sid);
});

router.post("/crear_canal", async (req, res) => {
  const response = await createChanel(req.body.sid, req.body.nombre);
  const response_chanels = await canalesCreados();
  res.render("layouts/dashboard", { canales: response_chanels });
});

router.get("/cargar", async (req, res) => {
  const response_chanels = await canalesCreados();
  res.render("layouts/dashboard", { canales: response_chanels });
});

router.post("/sms", async (req, res) => {
  console.log(req.body);
  res.send("Recivido");
});

router.post("/joinChat", async (req, res) => {
  var respuesta = await miembros(req.body.chanel);
  var existe = false;
  respuesta.forEach((element) => {
    var nombreNuevo = req.body.aka;
    var nombreRegistrado = element.identity;
    if (nombreRegistrado == nombreNuevo) {
      existe = true;
    }
  });
  if (existe) {
    const response_chanels = await canalesCreados();
    res.render("layouts/canales_cliente", {
      canales: response_chanels,
      respuesta: 'true',
      canal: req.body.chanel,
      aka: req.body.aka,
    });
  } else {
    const response = await unirse(req.body.chanel, req.body.aka);
    console.log(req.body.aka);
    var mensajes = await lista_de_mensajes(req.body.chanel);
    var nombreCanal = traerCanal(req.body.chanel);
    var friendlyName =(await nombreCanal).friendlyName;
    res.render("layouts/enviar_sms", {
      lista_mensajes: mensajes,
      canal: req.body.chanel,
      user: req.body.aka,
      sid: response[0],
      frName: friendlyName,
      miembros:respuesta
    });
  }
});

module.exports = router;
//IS3ed18df849e34ebea8471e84f1b65fa4
