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