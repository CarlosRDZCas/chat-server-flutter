const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');
const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controllers/socket');





io.on('connection', client => {


    console.log('Client connected');

    const [valid, uid] = comprobarJWT(client.handshake.headers['x-token'])
    console.log(valid, uid)
    if (!valid) {
        return client.disconnect();
    }
    usuarioConectado(uid);

    client.join(uid);

    client.on('mensaje-personal', async (payload) => {
        await grabarMensaje(payload);
        console.log(payload);
        io.to(payload.para).emit('mensaje-personal', payload);
    });




    client.on('disconnect', () => {
        usuarioDesconectado(uid);
        console.log('Client disconnected');
    });



    // client.emit('active-bands', bands.getBands());

    // client.on('mensaje', (payload) => {
    //     console.log('mensaje recibido ', payload);
    //     io.emit('mensaje', { admin: 'Nuevo Mensaje' });
    // })

    // client.on('nuevo-mensaje', (payload) => {
    //     client.broadcast.emit('nuevo-mensaje', payload);
    // })

    // client.on('vote-band', (payload) => {
    //     bands.voteBand(payload.id);
    //     io.emit('active-bands', bands.getBands());
    // })

    // client.on('add-band', (payload) => {
    //     const newband = new Band(payload.name);
    //     bands.addBand(newband);
    //     io.emit('active-bands', bands.getBands());
    // })


    // client.on('delete-band', (payload) => {
    //     bands.deleteBands(payload.id);
    //     io.emit('active-bands', bands.getBands());
    // })

});
