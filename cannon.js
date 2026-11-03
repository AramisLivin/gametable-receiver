const CANNON_FROM_SIDE_VH = 7;

const CANNON_FROM_BOTTOM_VH = 6;

const BARREL_VH = 6.5;

const CANNON_AIM_MS = 70;

const CANNON_FLIGHT_MS = 130;

const CANNON_REST_DEGREES = 35;

let cannonSide = null;

function placeCannon(side) {
    const cannon = $('cannon');
    if (side !== cannonSide) {
        cannonSide = side;
        cannon.classList.toggle('right', side === 1);
        cannon.querySelector('.cannon-aim').style.transform = `rotate(${side === 1 ? -CANNON_REST_DEGREES : CANNON_REST_DEGREES}deg)`;
    }
    cannon.classList.add('on');
}

function hideCannon() {
    $('cannon').classList.remove('on');
}

function fireCannon(side, owner, x, y, slow = 1) {
    const cell = document.querySelector(`#battleship .sea[data-owner="${owner}"] .cell[data-x="${x}"][data-y="${y}"]`);
    if (!cell || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 0;
    placeCannon(side);
    const vh = window.innerHeight / 100;
    const fromX = side === 1 ? window.innerWidth - CANNON_FROM_SIDE_VH * vh : CANNON_FROM_SIDE_VH * vh;
    const fromY = window.innerHeight - CANNON_FROM_BOTTOM_VH * vh;
    const box = cell.getBoundingClientRect();
    const toX = box.left + box.width / 2;
    const toY = box.top + box.height / 2;
    const angle = Math.atan2(toY - fromY, toX - fromX);
    $('cannon').querySelector('.cannon-aim').style.transform = `rotate(${angle + Math.PI / 2}rad)`;
    setTimeout((() => {
        playSound(slow > 1 ? 'launch' : 'fire');
        if (slow > 1) playSound('whistle', CANNON_FLIGHT_MS * slow / 1e3);
        $('cannon').querySelector('.cannon-gun').animate([ {
            transform: 'none'
        }, {
            transform: `translateY(${1.4 * vh}px)`
        }, {
            transform: 'none'
        } ], {
            duration: 180,
            easing: 'ease-out'
        });
        $('cannon').querySelector('.cannon-flash').animate([ {
            opacity: 1,
            transform: 'scale(.6)'
        }, {
            opacity: 0,
            transform: 'scale(1.5)'
        } ], {
            duration: 120,
            easing: 'ease-out'
        });
        const shell = div('cannon-shell');
        document.body.appendChild(shell);
        const muzzleX = fromX + Math.cos(angle) * BARREL_VH * vh;
        const muzzleY = fromY + Math.sin(angle) * BARREL_VH * vh;
        shell.animate([ {
            transform: `translate(${muzzleX}px, ${muzzleY}px) rotate(${angle}rad)`
        }, {
            transform: `translate(${toX}px, ${toY}px) rotate(${angle}rad)`
        } ], {
            duration: CANNON_FLIGHT_MS * slow,
            easing: 'linear'
        }).onfinish = () => shell.remove();
    }), CANNON_AIM_MS);
    return CANNON_AIM_MS + CANNON_FLIGHT_MS * slow;
}