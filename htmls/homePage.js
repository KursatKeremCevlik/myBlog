$(() => {
    const socket = io.connect('http://localhost:3000');

    socket.emit('PLEASE_BLOG_DATAS');

    socket.on('BLOGS', veri => {
        $('.Blogs').append(`
            <div class="BlogHome" id="BlogHome">
                <div class="BlogTitle">${veri.title}</div>
                <div class="BlogContent"><a class="space" id="space">....</a>${veri.content}</div>
                <div class="BlogDate">${veri.date}</div>
            </div>
        `);
    });
    
    $('.darkModeButon').on('click', () => {
        document.body.style.backgroundColor = "black";
        document.getElementById("BlogHome").style.color = "white";
        document.getElementById("space").style.color = "black";
        document.getElementById("Github").style.color = "white";
        document.getElementById("Name").style.color = "white";
        document.getElementById("buton1").style.border = '1px solid black';
        document.getElementById("buton2").style.border = '1px solid black';
    });
    $('.lightModeButon').on('click', () => {
        document.body.style.backgroundColor = "white";
        document.getElementById("BlogHome").style.color = "black";
        document.getElementById("space").style.color = "white";
        document.getElementById("Github").style.color = "black";
        document.getElementById("Name").style.color = "black";
        document.getElementById("buton1").style.border = '1px solid white';
        document.getElementById("buton2").style.border = '1px solid white';
    });
});