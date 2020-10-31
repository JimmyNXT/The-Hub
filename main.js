const PORT = process.env.PORT || 3000;


const io = require('socket.io').listen(PORT);

/*let allTheSockets = [];


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

    sock.on('Heartbeat', (type, message) => {
        console.log(message);
    });
});*/

const BROWSER_CLIENTS = {};
const SERVER_CLIENTS = {};

io.on("connection", socket => {
    console.log(socket.id);
    socket.join('global');

    socket.on("source", payload => {
        if (payload == "browser")
            BROWSER_CLIENTS[socket.id] = socket;
        else if (payload == "server")
            SERVER_CLIENTS[socket.id] = socket;
    });
    socket.on("disconnect", () => {
        delete BROWSER_CLIENTS[socket.id];
        delete SERVER_CLIENTS[socket.id];
    });

    socket.on('Heartbeat', (type, message) => {
        console.log(message);
    });

    socket.on('Broadcast', (type, message) => {
        console.log(message);
        socket.to('global').emit('Broadcast', type, message);
    });
});