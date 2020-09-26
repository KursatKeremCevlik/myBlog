$(() => {
    const socket = io.connect('https://kursatkeremcevlik-blog.herokuapp.com/');
    // const socket = io.connect('http://localhost:3000/');
    let Username;

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

    $('.chatButon').on('click', () => {
        $('.homeScreen').hide();
        $('.continue_chatScreen').show();
    });
    const UsernameValue = document.getElementById('name_input');
    const Password = document.getElementById('password_input');

    const continueChatForm = document.getElementById('continueChatForm');
    continueChatForm.addEventListener('submit', e => {
        e.preventDefault();
        const username = UsernameValue.value;
        const password = Password.value;
        socket.emit('CONTINUE_CHAT_ROOM_REQUEST', { username, password });
        Username = username;
    });
    socket.on('EMPTY_USERNAME', () => {
        $('.info-text').hide();
        $('.main').hide();
        $('.empty_username').show();
    });
    socket.on('EMPTY_PASSWORD', () => {
        $('.info-text').hide();
        $('.main').hide();
        $('.empty_password').show();
    });
    socket.on('WRONG_ACCOUNT_VALUES', () => {
        $('.info-text').hide();
        $('.main').hide();
        $('.wrong_account').show();
        UsernameValue = '';
        Password = '';
    });
    socket.on('WAIT-1', () => {
        $('.main').hide();
        $('.info-text').hide();
        $('.wait-1').show();
    });
    socket.on('WAIT-2', () => {
        $('.main').hide();
        $('.info-text').hide();
        $('.wait-2').show();
    });
    socket.on('WAIT-3', () => {
        $('.main').hide();
        $('.info-text').hide();
        $('.wait-3').show();
    });
    socket.on('TRUE_LOGIN', () => {
        $('.info-text').hide();
        $('.continue_chatScreen').hide();
        $('.homeScreen').hide();
        $('.chatScreen').show();
        socket.emit('PLEASE_MESSAGE_DATAS', { Username });
    });
    
    socket.on('FROM_DATABASE', (data) => {
        if(data.confirm){
            // My message
            $('.messages_size').append(`
                <div class="my_message_block">
                    <div class="message_username">${data.veri.username}</div>
                    <div class="my_message">${data.veri.message}</div>
                    <div class="time">${data.veri.time}</div>
                </div>
            `);
        }else{
            // Another message
            $('.messages_size').append(`
                <div class="another_message_block">
                    <div class="message_username">${data.veri.username}</div>
                    <div class="another_message">${data.veri.message}</div>
                    <div class="time">${data.veri.time}</div>
                </div>
            `);
        }
    });

    const Form = document.getElementById('mesage_form');
    Form.addEventListener('submit', e => {
        e.preventDefault();
        const Message = document.getElementById('message_input');
        const message = Message.value;
        const date = Date()
        const words = date.split(' ');
        const str = words[4]
        const chars = str.split('');
        const clock = chars[0] + chars[1] + ':' + chars[3] + chars[4];
        socket.emit('CHAT_MESSAGE', { Username, message, clock });
        Message.value = '';
    });

    socket.on('NEW_CHAT_MESSAGE', (data) => {
        if(data.confirm){
            $('.messages_size').append(`
            <div class="my_message_block">
                <div class="message_username">${data.username}</div>
                <div class="my_message">${data.message}</div>
                <div class="time">${data.time}</div>
            </div>
        `);
        }else{
            $('.messages_size').append(`
            <div class="another_message_block">
                <div class="message_username">${data.username}</div>
                <div class="another_message">${data.message}</div>
                <div class="time">${data.time}</div>
            </div>
            `);
        }
    });

    socket.on('THIS_USERNAME_NOT_AVAILABLE', () => {
        $('.name_text').hide();
        $('.wrong_name_text').hide();
        $('.username_not_available').show();
    });
});