require('dotenv').config();
const app = require('./server');
const socketIO = require('socket.io');
//Me conecto a la base de datos
//require('./database');
const server = app.listen(app.get('port'),()=>{
    console.log('Escuchando en el puerto '+app.get('port'));
});
const io = socketIO(server);
io.on('connection',(socket)=>{
    console.log('New conection '+socket.id);
    socket.on('chat',(data)=>{
        console.log(data);
        io.sockets.emit('chat',data);
    })
});