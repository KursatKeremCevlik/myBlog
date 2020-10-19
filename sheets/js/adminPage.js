$(() => {
//   const socket = io.connect('https://kursatkeremcevlik-blog.herokuapp.com/');
  const socket = io.connect('http://localhost:3000');

  const controlForm = document.getElementById('control-form');
  const controlButon = document.getElementById('control-room-buton');
  controlButon.value = 'Onay için gönder';
  const Username = document.getElementById('control-room-username');
  const Password = document.getElementById('control-room-password');
  
  controlForm.addEventListener('submit', e => {
    const username = Username.value;
    const password = Password.value;
    socket.emit('ADMIN_CONTROL_REQUEST', { username, password });
  });
});