const socketio = require('socket.io');
const io = socketio();

// Models
const Blog = require('../models/Blog');
const Comments = require('../models/Comments');
const Admin = require('../models/Admin');

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

  socket.on('NEW_COMMENT', (data) => {
    if(data.comment){
      let a = true;
      let idValue;
      Comments.find((err, object) => {
        if(!err){
          while(a){
            let finish = true;
            idValue = Math.floor(Math.random() * 5);
            for(var i = 0; i < object.length; i++){
              let veri = object[i];
              if(veri.SecretId == idValue){
                // Wrong id. Try another id.
                finish = false;
              }
            }
            if(finish){
              a = false;
            }
          }
        }
      });
      const commentData = new Comments({
        comment: data.comment,
        secretID: idValue
      });
      commentData.save((err) => {
        if(!err){
          const text = 'Geri bildiriminiz için teşekkürler';
          socket.emit('COMMENT_STATUS', { text });
        }else{
          const text = 'Bir sıkıntıdan ötürü geribildiriminiz alınmadı';
          socket.emit('COMMENT_STATUS', { text });
        }
      });
    }else{
      const text = 'Herhangi bir şey yazmadınız';
      socket.emit('COMMENT_STATUS', { text });
    }
  });

  socket.on('ADMIN_CONTROL_REQUEST', (data) => {
    if(!data.username){
      const text = 'Kullanıcı adı girmediniz';
      socket.emit('ADMIN_CONTROL_RESPONSE', { text });
    }else if(!data.password){
      const text = 'Şifre girmediniz';
      socket.emit('ADMIN_CONTROL_RESPONSE', { text });
    }else{
      Admin.find({username: data.username, password: data.password}, (err, object) => {
        if(!err && object[0]){
          const success = 1
          const link = '/adminPage/'
          const databaseID = object[0]._id;
          socket.emit('ADMIN_CONTROL_RESPONSE', { success, link, databaseID });
        }else{
          const wrong = 1;
          const text = 'Kullanıcı adı veya şifre hatalı';
          socket.emit('ADMIN_CONTROL_RESPONSE', { wrong, text });
        }
      });
    }
  });

  socket.on('PLEASE_AUTH_ADMIN', (data) => {
    socket.emit('PLEASE_WAIT');
    Admin.find((err, object) => {
      let finish = false;
      for(var i = 0; i < object.length; i++){
        if(!err && data.databaseID == object[i]._id){
          finish = true;
        }
      }
      if(finish){
        socket.emit('SUCCESS_ADMIN_LOGIN');
      }else{
        socket.emit('WRONG_ADMIN_LOGIN');
      }
    });
  });

  socket.on('PLEASE_COMMENT_DATAS', () => {
    Comments.find((err, object) => {
      if(!err && object[0]){
        for(var i = 0; i < object.length; i++){
          const comment = object[i].comment;
          socket.emit('COMMENT_DATA', { comment });
        }
      }
    });
  });
});

module.exports = socketApi;