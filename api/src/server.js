require('dotenv').config();

const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const socketio = require('socket.io');
const http = require('http');

const app = express();
const server = http.Server(app)
const io = socketio(server);
const port = 3001;

const connectedUsers = {};

//banco de dados mongodb no servidor mongo atlas
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

io.on('connection', socket => {
    const { user_id } = socket.handshake.query;
    console.log('user connected','socket ' + socket.id, 'user ' + user_id);
    
    connectedUsers[user_id] = socket.id;
    
    // //envia informação ao cliente
    // socket.emit('hello', 'world');

    // //recebe informação do cliente
    // socket.on('omini', data => {
    //     console.log(data);
    // })
});

app.use((req, res, next) =>{
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});

app.use(cors()); //origin:'http://localhost:3000
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '../', 'uploads')));
app.use(routes);

server.listen(port, () => {
    console.warn(`Server API running in ${port}\n`);
});
