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
const { editarCanal } = require("../twilio/canales");
const { unirse } = require("../twilio/chatroom");
const { miembros } = require("../twilio/chatroom");
const { lista_de_mensajes } = require("../twilio/chatroom");

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

router.post("/send-sms", async (req, res) => {
  const response = await sendMessage(req.body.sid, req.body.nombre);
  console.log(response.sid);
  res.render("layouts/enviar_sms");
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
  let sid = req.params.sid;
  borrarCanal(sid);
  return "Se borró con éxito";
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
    res.render(
      "layouts/canales_cliente",
      { canales: response_chanels,respuesta: "El A.K.A ingresado no está disponible" });
  } else {
    await unirse(req.body.chanel, req.body.aka);
    var mensajes = await lista_de_mensajes(req.body.chanel);
    res.send(
      "Chatroom con una población de miembros de " +
        respuesta.length +
        " Cantidad de mensajes " +
        mensajes.length
    );
  }
});


module.exports = router;
//IS3ed18df849e34ebea8471e84f1b65fa4