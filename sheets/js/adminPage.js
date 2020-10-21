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
  });

  $('.add_new_blog').on('click', () => {
    $('.adminPage').hide();
    $('.butons_home').hide();
    $('.new_blog').show();
  });
  $('.show_comment_details').on('click', () => {
    $('.adminPage').hide();
    $('.butons_home').hide();
    $('.show_comment').show();
  });
  $('.add_new_admin').on('click', () => {
    $('.adminPage').hide();
    $('.butons_home').hide();
    $('.new_admin').show();
  });
});