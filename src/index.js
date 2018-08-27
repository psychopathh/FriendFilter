console.log('Hello');

import './style/style.css';
import render from './templates/friends.hbs'

VK.init({
    apiId: 6674759
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
        const container = document.querySelector('.list');

		container.innerHTML = render({ friends });
    })