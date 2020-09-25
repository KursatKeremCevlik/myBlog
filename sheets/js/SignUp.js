$(() => {
    const socket = io.connect('https://kursatkeremcevlik-blog.herokuapp.com/');
    // const socket = io.connect('http://localhost:3000');

    const Form = document.getElementById('form');
    const Name = document.getElementById('name');
    const Surname = document.getElementById('surname');
    const Year = document.getElementById('year');
    const Username = document.getElementById('username');
    const Password = document.getElementById('password');

    Form.addEventListener('submit', e => {
        e.preventDefault();
        const name = Name.value;
        const surname = Surname.value;
        const year = Year.value;
        const username = Username.value;
        const password = Password.value;

        socket.emit('NEW_ACCOUNT_DATAS', {
            name,
            surname,
            year,
            username,
            password
        });
    });

    socket.on('EMPTY_NAME_ACCOUNT', () => {
        $('.main').hide();
        $('.message').hide();
        $('.empty_name').show();
    });
    socket.on('EMPTY_SURNAME_ACCOUNT', () => {
        $('.main').hide();
        $('.message').hide();
        $('.empty_surname').show();
    });
    socket.on('EMPTY_YEAR_ACCOUNT', () => {
        $('.main').hide();
        $('.message').hide();
        $('.empty_year').show();
    });
    socket.on('EMPTY_USERNAME_ACCOUNT', () => {
        $('.main').hide();
        $('.message').hide();
        $('.empty_username').show();
    });
    socket.on('EMPTY_PASSWORD_ACCOUNT', () => {
        $('.main').hide();
        $('.message').hide();
        $('.empty_password').show();
    });
    socket.on('THIS_USERNAME_NOT_EMPTY', () => {
        $('.main').hide();
        $('.message').hide();
        $('.username_not_available').show();
    });
    socket.on('SUCCESS_NEW_ACCOUNT_DATA_SAVE', () => {
        $('.main').hide();
        $('.message').hide();
        $('.success').show();
        Name.value = '';
        Surname.value = '';
        Year.value = '';
        Username.value = '';
        Password.value = '';
    });
});