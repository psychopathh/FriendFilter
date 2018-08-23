VK.init({
	apiId: 6671023
});
VK.Auth.login(function (response) {
    if (response.session) {
        console.log('всё ок!');
    } else {
        alert('Не удалось авторизоваться');
    }
}, 8);

export * from 'index.js'