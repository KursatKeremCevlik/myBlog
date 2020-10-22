$(() => {
  const socket = io.connect('https://kursatkeremcevlik-blog.herokuapp.com/');
  // const socket = io.connect('http://localhost:3000');

  const controlForm = document.getElementById('control-form');
  const controlButon = document.getElementById('control-room-buton');
  controlButon.value = 'Onay için gönder';
  const Username = document.getElementById('control-room-username');
  const Password = document.getElementById('control-room-password');
  
  controlForm.addEventListener('submit', e => {
    e.preventDefault();
    const username = Username.value;
    const password = Password.value;
    socket.emit('ADMIN_CONTROL_REQUEST', { username, password });
  });

  socket.on('ADMIN_CONTROL_RESPONSE', (data) => {
    if(!data.success && !data.wrong){
      $('.control-hero-title').html(data.text);
    }else if(!data.success && data.wrong){
      $('.control-hero-title').html(data.text);
      Password.value = '';
    }else if(data.success && !data.wrong){
      $('.control-hero-title').html('Yönlendiriliyorsunuz');
      localStorage.setItem('kursatkerem-blog-admin-ID', data.databaseID);
      Username.value = '';
      Password.value = '';
      location.href = data.link;
    }
  });
});