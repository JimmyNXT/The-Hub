const PORT = process.env.PORT || 3000;


const socketIO = require('socket.io').listen(PORT);

let allTheSockets = [];


socketIO.on('connection', (sock) => 
{
    allTheSockets.push(sock);
    console.log(sock.handshake);
    sock.on('Broadcast', (type,message) => {
        allTheSockets.forEach(s => {
            if(s.disconnected)
            {
                allTheSockets.splice(allTheSockets.indexOf(s)+1,1);
            }
            else
            {
                s.emit('Broadcast',type, message);
            }
        });
    });
});