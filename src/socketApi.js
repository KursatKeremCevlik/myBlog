const socketio = require('socket.io');
const io = socketio();

const socketApi = {  };
socketApi.io = io;

io.on('connection', (socket) => {
  // console.log('a user connected');

  socket.on('disconnect', () => {
      // console.log('a user disconnected');
  });
});

module.exports = socketApi;