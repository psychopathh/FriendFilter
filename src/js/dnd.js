const container = document.querySelector('.left .list');
const containerRight = document.querySelector('.right .list')
const leftInput = document.querySelector('.search-friend');
const rightInput = document.querySelector('.search-right');

import { filterItems, filter, isMatching } from './../js/filter.js'
let dnd = function (zones) {
    let currentDrag;

    zones.forEach(zone => {
        zone.addEventListener('dragstart', (e) => {
            currentDrag = { source: zone, node: e.target };
        });

        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        zone.addEventListener('drop', (e) => {
            if (currentDrag) {
                e.preventDefault();

                if (currentDrag.source !== zone) {
                    if (e.target.classList.contains('item')) {
                        zone.insertBefore(currentDrag.node, e.target.nextElementSibling);
                    } else {
                        zone.insertBefore(currentDrag.node, zone.lastElementChild);
                        let item = currentDrag.node;
                        let nameFriend = item.querySelector('.first_name').textContent + item.querySelector('.last_name').textContent;

                        if (zone == container) {
                            if (isMatching(nameFriend, leftInput.value) == false) {
                                item.style.display = 'none'
                            }
                        }
                        if (zone == containerRight) {
                            if (isMatching(nameFriend, rightInput.value) == false) {
                                item.style.display = 'none'
                            }
                        }
                    }
                    let span = currentDrag.node.querySelector('li span')

                    if (span.className == 'plus') {
                        span.className = 'close'
                    } else {
                        span.className = 'plus'
                    }
                }
                currentDrag = null;
            }
        });
    })
}

export { dnd }