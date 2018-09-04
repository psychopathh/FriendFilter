const container = document.querySelector('.left .list');
const containerRight = document.querySelector('.right .list')
const leftInput = document.querySelector('.search-friend');
const rightInput = document.querySelector('.search-right');

let dropFriend = function () {
    let spanPlus = container.querySelectorAll('.plus')

    for (let item of spanPlus) {
        item.addEventListener('click', function (e) {
            let target = e.target;

            if (target.className == 'plus') {
                containerRight.appendChild(item.parentElement)
                let plus = containerRight.querySelector('.plus');

                plus.className = 'close'
            }
            let spanClose = containerRight.querySelectorAll('.close')

            for (let itemClose of spanClose) {
                itemClose.addEventListener('click', function (e) {
                    let target = e.target;

                    if (target.className == 'close') {
                        container.appendChild(itemClose.parentElement)
                        let close = container.querySelector('.close');

                        close.className = 'plus'
                    }
                })
            }
        })
    }
}

export { dropFriend }