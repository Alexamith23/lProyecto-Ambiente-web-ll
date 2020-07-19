require('dotenv').config();
const app = require('./server');

//Me conecto a la base de datos
//require('./database');
app.listen(app.get('port'),()=>{
    console.log('Escuchando en el puerto '+app.get('port'));
});