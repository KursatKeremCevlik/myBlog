const socketio = require('socket.io');
const io = socketio();

// Models
const Blog = require('../models/Blog');
const Comments = require('../models/Comments');

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
      const commentData = new Comments({
        comment: data.comment
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
});

module.exports = socketApi;