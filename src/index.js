import './style/style.css';
import render from './templates/friends.hbs'
import { filterItems, filter, isMatching } from './js/filter.js'
import { dropFriend } from './js/dropFriend.js'
import { dnd } from './js/dnd.js'
import { saveInStorage, store } from './js/storage.js'

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
        dropFriend();
        filter();
        dnd([container, containerRight]);
        store()
    })

const container = document.querySelector('.left .list');
const containerRight = document.querySelector('.right .list')

let rend = function(arr) {

    if (localStorage.rightStore) {
        let items = JSON.parse(localStorage.rightStore)

        containerRight.innerHTML = render(items)
        let span = containerRight.querySelectorAll('span')

        span.forEach( item => {
            item.className = 'close'
        })
    }
    if (localStorage.leftStore) {
        let itemsLeft = JSON.parse(localStorage.leftStore)

        container.innerHTML = render(itemsLeft)
    } else {
        container.innerHTML = render(arr);
    }
}

