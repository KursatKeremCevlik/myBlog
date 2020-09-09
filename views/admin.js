$(() => {
    const socket = io.connect('http://localhost:3000');

    $('.link').on('click', () => {
        $('.AdminHomePage').hide();
        $('.AdminBlogPage').show();
    });
});