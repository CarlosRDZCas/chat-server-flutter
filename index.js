const path = require('path');
const express = require('express')
require('./database/config.js').dbConnection();
require('dotenv').config();

const app = express();
app.use(express.json());


const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);

require('./sockets/sockets');

const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

app.use('/api/login',require('./routes/auth'))

server.listen(process.env.PORT, (err) => {
    if (err) throw new Error(err);
    console.log('Server is running on port !', process.env.PORT);
});

