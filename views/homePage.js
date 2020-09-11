$(() => {
    const socket = io.connect('https://kursatkeremcevlik-blog.herokuapp.com/');

    socket.emit('PLEASE_BLOG_DATAS');

    socket.on('BLOGS', veri => {
        $('.Blogs').append(`
            <div class="BlogHome">
                <div class="BlogTitle">${veri.title}</div>
                <div class="BlogContent"><a class="space">....</a>${veri.content}</div>
                <div class="BlogDate">${veri.date}</div>
            </div>
        `);
    });
});