const {Router} = require('express');
const router = Router();
const {sendMessage}=require('../twilio/send-sms');

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
module.exports =router;