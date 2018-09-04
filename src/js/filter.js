const container = document.querySelector('.left .list');
const containerRight = document.querySelector('.right .list')
const leftInput = document.querySelector('.search-friend');
const rightInput = document.querySelector('.search-right');

function isMatching(full, chunk) {
    return full.toLowerCase().includes(chunk.toLowerCase())
}
let filterItems = function (list, input) {
    input.addEventListener('keyup', function () {
        let friends = list.querySelectorAll('li')

        friends.forEach(function (item) {
            let nameFriend = '';

            item.style.display = 'none'
            nameFriend = item.querySelector('.name').textContent;
            if (isMatching(nameFriend, input.value)) {
                item.style.display = 'flex'
            }
            if (input.value == ' ' || input.value == '') {
                item.style.display = 'flex'
            }
        })
    })
}

let filter = function () {
    leftInput.addEventListener('click', function () {
        filterItems(container, leftInput)
    })
    rightInput.addEventListener('click', function () {
        filterItems(containerRight, rightInput)
    })
}

export { filterItems, filter, isMatching }