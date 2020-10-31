const PORT = process.env.PORT || 3000;


const socketIO = require('socket.io').listen(PORT);


socketIO.on('connection', (sock) => 
{
    //console.log(sock.handshake);
    sock.emit('message', 'text', 'This is a test');
});

socketIO.on('test', (text) => {console.log(test)});