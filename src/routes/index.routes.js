const {Router} = require('express');
const router = Router();
const {sendMessage}=require('../twilio/send-sms');
const {createService} = require('../twilio/crear_servicio');
const {login} = require('../twilio/crear_servicio');
const {obtenerServicios} = require('../twilio/crear_servicio');
const {listarServiciosCreados} = require('../twilio/crear_servicio');
const {createChanel} = require('../twilio/crear_canal');
const {canalesCreados} = require('../twilio/crear_canal');


router.get('/',(req,res) => {
    res.render('index');
})

router.get('/src/views/layouts/enviar_sms',(req,res) => {
    res.render('layouts/enviar_sms');
})

router.post('/send-sms',async (req, res) => {
    const response = await sendMessage(req.body.mensaje, req.body.numero);
    console.log(response.sid);
    res.render('layouts/enviar_sms');
});

router.post('/entrar',async (req, res) => {
    const response = await login(req.body.user, req.body.password);
    if(response){
        const response_service = await obtenerServicios();
        if(response_service == 0){
            console.log(createService().sid);
        }
        listarServiciosCreados();
        const response_chanels = await canalesCreados();
        res.render('layouts/dashboard',{canales:response_chanels});
    }else{
        res.render('index', {title: 'El usuario o la contraseña es incorrecto.'})
    }
});


router.post('/crear_canal',async (req, res) => {
    const response = await createChanel(req.body.sid);
    res.render('layouts/dashboard');
});

//IS3ed18df849e34ebea8471e84f1b65fa4


module.exports = router;