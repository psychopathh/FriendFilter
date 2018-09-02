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
        left = items;
		rend(items)
    })

function isMatching(full, chunk) {
    return full.toLowerCase().includes(chunk.toLowerCase())
}

const container = document.querySelector('.left .list');
const containerRight = document.querySelector('.right .list')
const fieldFriend = document.querySelector('.search-friend');

let left = [];
let right = [];

var rend = function(arr) {

    container.innerHTML = render(arr);
    filter(arr)
    dnd()
}

var filter = function(arr) {
    let result = '';

    fieldFriend.addEventListener('keyup', function() {
        container.innerHTML = '';
        let obj = {
            items: []
        };

        for (let item of arr.items) {
            if (item) {
                result = `${item.first_name} ${item.last_name}`
                if (isMatching(result, fieldFriend.value)) {
                    obj.items.push(item)
                    container.innerHTML = render(obj);
                }
                if (fieldFriend.value == '') {
                    container.innerHTML = render(arr);
                }
            }
        }
        dnd()
    })
}

var dnd = function() {
    let spanPlus = document.querySelectorAll('li .plus')
    for (let item of spanPlus) {
        item.addEventListener('click', function(e) {
            let target = e.target;
			left = item.parentElement;
            if (target.className == 'plus') {
                containerRight.appendChild(item.parentElement)
                let plus = containerRight.querySelector('.plus');

				plus.className = 'close'
				right.push(item.parentElement)
            }
        })
	}
	console.log(right)
}
