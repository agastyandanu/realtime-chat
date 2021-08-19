const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const ejs = require('ejs');
const server = require('http').createServer(app);
const io = require('socket.io')(server, {});
// const { JSDOM } = require( "jsdom" );
// const { window } = new JSDOM( "" );
// const $ = require( "jquery" )( window );

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

let countUserOnline = 1;
io.on("connection", socket => {
    console.log('connection ok')
    socket.on('join', param => {
        console.log('User Join');
        countUserOnline++;
        io.emit('countUserOnline', countUserOnline);
    })
    socket.on('message', param => {
        console.log('User Send Message');
        io.emit('message', param);
    })
    socket.on('disconnect', param => {
        console.log('User Leave');
        countUserOnline--;
        io.emit('countUserOnline', countUserOnline);    
    })
});

server.listen(3000)