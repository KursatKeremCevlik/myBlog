const socketio = require('socket.io');
const io = socketio();

// Models
const Blog = require('../models/Blog');
const Admin = require('../models/Admin');

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

  socket.on('PLEASE_BLOG_DATAS', () => {
    Blog.find((err, data) => {
      if(!err){
        socket.emit('PLEASE_CLEAR_PAGE');

        for(var i = 0; i < data.length; i++){
          let veri = data[i];

          socket.emit('BLOGS', veri);
        }
      }
    });
  });

  socket.on('AdminControl', (data) => {
    if(!data.username){
      socket.emit('WRONG_USERNAME');
    }else if(!data.password){
      socket.emit('WRONG_PASSWORD');
    }else{
      socket.emit('CONTROL-1');
      setTimeout(() => {
        socket.emit('CONTROL-2');
      }, 500);
      setTimeout(() => {
        socket.emit('CONTROL-3');
      }, 1000);
      setTimeout(() => {
        Admin.find({ username: data.username, password: data.password }, (err, data) => {
          if(!data.length == 0){
            socket.emit('FIND_ACCOUNT');
          }else{
            socket.emit('WRONG_ACCOUNT_VALUES');
          }
        });
      }, 1500);
    }
  });
});

module.exports = socketApi;