$(() => {
    const socket = io.connect('http://localhost:3000');

    const invis = () => {
        $('.WRONG_USERNAME').hide();
        $('.WRONG_PASSWORD').hide();
        $('.CONTROL-1').hide();
        $('.CONTROL-2').hide();
        $('.CONTROL-3').hide();
        $('.WRONG_ACCOUNT').hide();
    }

    let BlogTitle;
    let BlogContent;
    let BlogDate;

    const Form = document.getElementById('form');
    const Buton = document.getElementById('ControlButon');
    Buton.value = 'Kontrol için gönder';

    const Username = document.getElementById('username');
    const Password = document.getElementById('password');
    Form.addEventListener('submit', e => {
        e.preventDefault();
        const username = Username.value;
        const password = Password.value;

        socket.emit('AdminControl', { username, password });
    });

    socket.on('WRONG_USERNAME', () => {
        invis();
        $('.control_messages').show();
        $('.WRONG_USERNAME').show();
    });
    socket.on('WRONG_PASSWORD', () => {
        invis();
        $('.control_messages').show();
        $('.WRONG_PASSWORD').show();
    });
    socket.on('CONTROL-1', () => {
        Username.value = '';
        Password.value = '';
        invis();
        $('.control_messages').show();
        $('.CONTROL-1').show();
    });
    socket.on('CONTROL-2', () => {
        invis();
        $('.control_messages').show();
        $('.CONTROL-2').show();
    });
    socket.on('CONTROL-3', () => {
        invis();
        $('.control_messages').show();
        $('.CONTROL-3').show();
    });
    socket.on('WRONG_ACCOUNT_VALUES', () => {
        invis();
        $('.control_messages').show();
        $('.WRONG_ACCOUNT').show();
    });
    socket.on('FIND_ACCOUNT', () => {
        $('.ControlPage').hide();
        $('.firstPage').show();
    });

    $('.writeBlogButton').on('click', () => {
        $('.firstPage').hide();
        $('.secondPage').show();
    });

    $('.ContentButon').on('click', () => {
        const BlogTitleValue = document.getElementById('title');
        const BlogDateValue = document.getElementById('date');
        BlogTitle = BlogTitleValue.value;
        BlogDate = BlogDateValue.value;
        $('.BlogFormHome').hide();
        $('.ContentFormHome').show();
    });

    $('.PreviewButon').on('click', () => {
        const BlogContentValue = document.getElementById('content');
        BlogContent = BlogContentValue.value;
        $('.ContentFormHome').hide();
        $('.PreviewPage').show();
        $('.PreviewBlogTitle').html(BlogTitle);
        $('.PreviewBlogContent').html(`<a class="space">....</a>${BlogContent}`);
        $('.PreviewBlogDate').html(BlogDate);
        $('.SaveButtonHome').show();
    });

    $('.SaveButton').on('click', () => {
        socket.emit('NEW_BLOG', { BlogTitle, BlogContent, BlogDate });
    });

    socket.on('TRUE_BLOG_SAVE', () => {
        $('.PreviewPage').hide();
        $('.SaveButtonHome').hide();
        $('.messages').show();
        $('.true_blog_save').show();
        $('.wrong_blog_save').hide();
    });

    socket.on('WRONG_BLOG_SAVE', () => {
        $('.PreviewPage').hide();
        $('.SaveButtonHome').hide();
        $('.messages').show();
        $('.true_blog_save').hide();
        $('.wrong_blog_save').show();
    });
});