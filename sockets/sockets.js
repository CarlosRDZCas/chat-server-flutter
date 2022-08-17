const { io } = require('../index');





io.on('connection', client => {


    console.log('Client connected');
    client.on('disconnect', () => { console.log('disconnected') });



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
