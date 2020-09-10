const socketio = require('socket.io');
const io = socketio();

// Models
const Blog = require('../models/Blog');

const socketApi = { };
socketApi.io = io;

io.on('connection', (socket) => {
  socket.on('NEW_BLOG', (data) => {
    const blog = new Blog({
      title: data.BlogTitle,
      content: data.BlogContent,
      date: data.BlogDate
    });
    blog.save((err) => {
      if(!err){
        socket.emit('TRUE_BLOG_SAVE');
      }else{
        socket.emit('WRONG_BLOG_SAVE');
      }
    });
  });
});

module.exports = socketApi;