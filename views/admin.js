$(() => {
    const socket = io.connect('http://localhost:3000');

    let BlogTitle;
    let BlogContent;
    let BlogDate;

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