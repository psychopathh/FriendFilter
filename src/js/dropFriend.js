const container = document.querySelector('.left .list');
const containerRight = document.querySelector('.right .list')
const leftInput = document.querySelector('.search-friend');
const rightInput = document.querySelector('.search-right');

let dropFriend = function () {
    let friendSpan = document.querySelectorAll('ul .friends span')

    friendSpan.forEach(function(item) {
        item.addEventListener('click', function(e) {
            if (e.target.className == 'close') {
                e.target.className = 'plus'
                container.appendChild(e.target.parentElement)
            } else if (e.target.className == 'plus') {
                e.target.className = 'close'
                containerRight.appendChild(e.target.parentElement)
            }
        })
    })
}

export { dropFriend }