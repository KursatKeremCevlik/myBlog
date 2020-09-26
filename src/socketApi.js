const socketio = require('socket.io');
const io = socketio();

// Models
const Blog = require('../models/Blog');
const Admin = require('../models/Admin');
const Message = require('../models/Message');
const Account = require('../models/Account');

const socketApi = { };
socketApi.io = io;

let counter = 0;

io.on('connection', (socket) => {
  counter += 1;
  // Disconnect
  socket.on('disconnect', () => {
    counter -= 1;
    io.emit('ONLINE_PEOPLE', counter);
  });
  io.emit('ONLINE_PEOPLE', counter);
  let username;
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

  socket.on('CONTINUE_CHAT_ROOM_REQUEST', (data) => {
    if(!data.username){
      socket.emit('EMPTY_USERNAME');
    }else if(!data.password){
      socket.emit('EMPTY_PASSWORD');
    }else{
      Account.find({username: data.username, password: data.password}, (err, data) => {
        if(data[0]){
          socket.emit('WAIT-1')
          setTimeout(() => {
            socket.emit('WAIT-2');
          }, 500);
          setTimeout(() => {
            socket.emit('WAIT-3');
          }, 1000);
          setTimeout(() => {
            socket.emit('TRUE_LOGIN');
          }, 1500);
        }else{
          socket.emit('WAIT-1')
          setTimeout(() => {
            socket.emit('WAIT-2');
          }, 500);
          setTimeout(() => {
            socket.emit('WAIT-3');
          }, 1000);
          setTimeout(() => {
            socket.emit('WRONG_ACCOUNT_VALUES');
          }, 1500);
        }
      });
    }
  });

  socket.on('CHAT_MESSAGE', (data) => {
    const username = data.Username;
    const message = data.message;
    const time = data.clock;
    const confirm = 1

    const messageData = new Message({
      username: data.Username,
      message: data.message,
      time: data.clock
    });
    messageData.save();

    socket.emit('NEW_CHAT_MESSAGE', { username, message, confirm, time });
    socket.broadcast.emit('NEW_CHAT_MESSAGE', { username, message, time });
  });

  socket.on('NEW_ACCOUNT_DATAS', (data) => {
    if(!data.name){
      socket.emit('EMPTY_NAME_ACCOUNT');
    }else if(!data.surname){
      socket.emit('EMPTY_SURNAME_ACCOUNT');
    }else if(!data.year){
      socket.emit('EMPTY_YEAR_ACCOUNT');
    }else if(!data.username){
      socket.emit('EMPTY_USERNAME_ACCOUNT');
    }else if(!data.password){
      socket.emit('EMPTY_PASSWORD_ACCOUNT');
    }else{
      Account.find({username: data.username}, (err, object) => {
        if(object[0]){
          socket.emit('THIS_USERNAME_NOT_EMPTY');
        }else{
          const accountData = new Account({
            name: data.name,
            surname: data.surname,
            year: data.year,
            username: data.username,
            password: data.password
          });
          accountData.save();
          socket.emit('SUCCESS_NEW_ACCOUNT_DATA_SAVE');
        }
      });
    }
  });

  socket.on('PLEASE_MESSAGE_DATAS', (data) => {
    Message.find((err, object) => {
      let confirm = 1;
      for(var i = 0; i < object.length; i++){
        let veri = object[i]
        if(veri.username == data.Username){
          socket.emit('FROM_DATABASE', { veri, confirm });
        }else{
          socket.emit('FROM_DATABASE', { veri });
        }
      }
    });
  });

  // Online people
  socket.on('PLEASE_ONLINE_PEOPLE', () => {
    io.emit('ONLINE_PEOPLE', counter);
  });

});

module.exports = socketApi;