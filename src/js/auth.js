VK.init({
    apiId: 6671023
});
function auth() {
    return new Promise((resolve, reject) => {
        VK.Auth.login(data => {
            if (data.session) {
                resolve();
            } else {
                reject(new Error('Не удалось авторизоваться'));
            }
        }, 2);
    });
}

function callApi(method, params) {
    params.v = '5.76';

    return new Promise((resolve, reject) => {
        VK.api(method, params, (data) => {
            if (data.error) {
                reject(data.error);
            } else {
                resolve(data.response)
            }
        })
    })
}

auth()
    .then(() => {
        return callApi('friends.get', { fields: 'photo_100 , first_name, last_name' });
    })
    .then(friends => {
		const template = document.querySelector('#friends-template').textContent;
		const render = Handlebars.compile(template);
		const html = render(friends)
		const results = document.querySelector('.list')

		results.innerHTML = html;
		console.log(friends)
    })