$(() => {
  const socket = io.connect('https://kursatkeremcevlik-blog.herokuapp.com/');
  // const socket = io.connect('http://localhost:3000');
  socket.emit('PLEASE_BLOG_DATAS');
  const date = new Date();
  socket.emit('DATE', {date});

  $('.about-row').on('click', () => {open_about_page();});
  $('.blog-row').on('click', () => {open_blog_page();});
  $('.code-row').on('click', () => {open_code_page();});
  $('.follow-row').on('click', () => {open_follow_page();});
  $('.comment-row').on('click', () => {open_comment_page();});

  $('.instagram').on('click', () => {location.href = 'https://www.instagram.com/krstkerem01/';});
  $('.github').on('click', () => {location.href = 'https://github.com/KursatKeremCevlik';});
  $('.linkedin').on('click', () => {location.href = 'https://www.linkedin.com/in/k%C3%BCr%C5%9Fat-kerem-%C3%A7evlik-1b855b1b1/';});

  $('.input-button').on('click', () => {
    const Comment = document.getElementById('comment-input');
    const comment = Comment.value;
    socket.emit('NEW_COMMENT', {comment});
    Comment.value = '';
  });

  socket.on('BLOG_DATAS', (blogData) => {
    $('.blogPage').append(`
    <div class="blog">
      <div class="blog-title text">${blogData.title}</div>
      <div class="blog-content text"><a class="space"></a> ${blogData.content}</div> 
      <div class="blog-date text">${blogData.date}</div>
    </div>
    `);
  });

  socket.on('COMMENT_STATUS', (data) => {
    $('.comment-title').html(`${data.text}`);
  });

  /* _-_-_-_-_-_-_-_-_-_-_-_-_------FUNCTIONS-----_-_-_-_-_-_-_-_-_-_-_-_-_- */
  // HTML Elements
  const aboutRow = document.getElementById('about-row');
  const blogRow = document.getElementById('blog-row');
  const codeRow = document.getElementById('code-row');
  const followRow = document.getElementById('follow-row');
  const commentRow = document.getElementById('comment-row');
  
  const open_blog_page = () => {
    aboutRow.style.background = 'rgb(59, 4, 104)';
    blogRow.style.background = 'rgb(94, 62, 4)';
    codeRow.style.background = 'rgb(59, 4, 104)';
    followRow.style.background = 'rgb(59, 4, 104)';
    commentRow.style.background = 'rgb(59, 4, 104)';
    invis();
    $('.blogPage').show();
  }
  const open_code_page = () => {
    aboutRow.style.background = 'rgb(59, 4, 104)';
    blogRow.style.background = 'rgb(59, 4, 104)';
    codeRow.style.background = 'rgb(94, 62, 4)';
    followRow.style.background = 'rgb(59, 4, 104)';
    commentRow.style.background = 'rgb(59, 4, 104)';
    invis();
    $('.codePage').show();
  }
  const open_follow_page = () => {
    aboutRow.style.background = 'rgb(59, 4, 104)';
    blogRow.style.background = 'rgb(59, 4, 104)';
    codeRow.style.background = 'rgb(59, 4, 104)';
    followRow.style.background = 'rgb(94, 62, 4)';
    commentRow.style.background = 'rgb(59, 4, 104)';
    invis();
    $('.followPage').show();
  }
  const open_comment_page = () => {
    aboutRow.style.background = 'rgb(59, 4, 104)';
    blogRow.style.background = 'rgb(59, 4, 104)';
    codeRow.style.background = 'rgb(59, 4, 104)';
    followRow.style.background = 'rgb(59, 4, 104)';
    commentRow.style.background = 'rgb(94, 62, 4)';
    invis();
    $('.commentPage').show();
  }
  const open_about_page = () => {
    aboutRow.style.background = 'rgb(94, 62, 4)';
    blogRow.style.background = 'rgb(59, 4, 104)';
    codeRow.style.background = 'rgb(59, 4, 104)';
    followRow.style.background = 'rgb(59, 4, 104)';
    commentRow.style.background = 'rgb(59, 4, 104)';
    invis();
    $('.aboutPage').show();
  }
  const invis = () => {
    $('.aboutPage').hide();
    $('.blogPage').hide();
    $('.codePage').hide();
    $('.followPage').hide();
    $('.commentPage').hide();
  }
  /* _-_-_-_-_-_-_-_-_-_-_-_-_------FUNCTIONS-----_-_-_-_-_-_-_-_-_-_-_-_-_- */
});