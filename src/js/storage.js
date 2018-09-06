const container = document.querySelector('.left .list');
const containerRight = document.querySelector('.right .list')

let saveInStorage = function (container, containerRight) {
    let left = { items: [] };
    let right = { items: [] };
    let itemLeft = container.querySelectorAll('li')
    let itemRight = containerRight.querySelectorAll('li')

    itemLeft.forEach(function (item) {
        let liFriend = {};

        liFriend.first_name = item.querySelector('.first_name').textContent
        liFriend.last_name = item.querySelector('.last_name').textContent
        liFriend.photo_50 = item.querySelector('img').getAttribute('src')
        left.items.push(liFriend)
    })
    itemRight.forEach(function (item) {
        let liFriend = {};

        liFriend.first_name = item.querySelector('.first_name').textContent
        liFriend.last_name = item.querySelector('.last_name').textContent
        liFriend.photo_50 = item.querySelector('img').getAttribute('src')
        right.items.push(liFriend)
    })
    localStorage.setItem('leftStore', JSON.stringify(left));
    localStorage.setItem('rightStore', JSON.stringify(right));
}

let store = function () {
    let save = document.querySelector('.save')

    save.addEventListener('click', e => {
        saveInStorage(container, containerRight);
    })
}

export { saveInStorage, store }