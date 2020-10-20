$(() => {
  const socket = io.connect('https://kursatkeremcevlik-blog.herokuapp.com/');
  // const socket = io.connect('http://localhost:3000');
  const databaseID = localStorage.getItem('kursatkerem-blog-admin-ID');

  socket.emit('PLEASE_AUTH_ADMIN', { databaseID });
  $('.waiting_room').show();

  socket.on('PLEASE_WAIT', () => {$('.page').hide();$('.waiting_room').show();});
  socket.on('WRONG_ADMIN_LOGIN', () => {$('.page').hide();$('.wrong_account_room').show();});
  socket.on('SUCCESS_ADMIN_LOGIN', () => {
    $('.page').hide();
    $('.admin_room').show();
    localStorage.clear();
  });
});