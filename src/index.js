import './style/style.css';
import render from './templates/friends.hbs'
import './js/main.js';

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
        return callApi('friends.get', { fields: 'photo_50 , first_name, last_name' });
    })
    .then(items => {
        rend(items);
    })

function isMatching(full, chunk) {
    return full.toLowerCase().includes(chunk.toLowerCase())
}

var rend = function (items) {
    const container = document.querySelector('.list');
    const fieldFriend = document.querySelector('.search-friend');
	
    container.innerHTML = render(items);
	
    fieldFriend.addEventListener('keyup', function () {
        const nameFriend = document.querySelectorAll('.friend .name');
        var result = [];

		fieldFriend.innerHTML = '';

        for (var key in nameFriend) {
            result.push(nameFriend[key].textContent);
        }
        result.forEach(function(item) {
            if (item != undefined) {
                if (isMatching(item, fieldFriend.value)) {
					container.innerHTML = render(items);
				}
                if (fieldFriend.value == '' ) {
					container.innerHTML = render(items);
                }
            }
		})
    })
}