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
        rend(items)
    })

function isMatching(full, chunk) {
    return full.toLowerCase().includes(chunk.toLowerCase())
}

const container = document.querySelector('.list');
const fieldFriend = document.querySelector('.search-friend');

let left = {
    friendsList: []
}
let right = {
    friendsList: []
}

var rend = function (items) {

    container.innerHTML = render(items);

    filter(items)
}

var filter = function (items) {
    let result = '';

    fieldFriend.addEventListener('keyup', function () {
        container.innerHTML = '';
        let obj = {
            items: []
        };

        for (let key in items.items) {
            if (key) {
                result = `${items.items[key].first_name} ${items.items[key].last_name}`
                if (isMatching(result, fieldFriend.value)) {
                    obj.items.push(items.items[key])
                    container.innerHTML = render(obj);
                }
                if (fieldFriend.value == '') {
                    container.innerHTML = render(items);
                }
            }
        }
    })
}