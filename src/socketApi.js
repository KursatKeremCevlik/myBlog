const socketio = require('socket.io');
const io = socketio();

// Models
const Blog = require('../models/Blog');

const socketApi = { };
socketApi.io = io;

let counter = 0;

io.on('connection', (socket) => {
  socket.on('PLEASE_BLOG_DATAS', () => {
    Blog.find((err, data) => {
      if(!err && data[0]){
        for(var i = 0; i < data.length; i++){
          let blogData = data[i]
          socket.emit('BLOG_DATAS', blogData);
        }
      }
    });
  });
});

module.exports = socketApi;