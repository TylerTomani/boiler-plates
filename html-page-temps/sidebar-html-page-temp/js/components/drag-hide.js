import { sideBar } from "../main-script";

let startX = 0;
let endX = 0;

document.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

document.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    const swipeDistance = endX - startX;

    if (swipeDistance < -50 && !sideBar.classList.contains('hidden')) {
        sideBar.classList.toggle('hidden');
    }
    if (swipeDistance < 50 && !sideBar.classList.contains('hidden')) {
        sideBar.classList.toggle('hidden');
    }
});
function getSideBar(parent) {
    if (parent.classList.contains('side-bar')) {
        return parent
    } else if (parent.parentElement) {
        return getSideBar(parent.parentElement)
    } else {
        return null
    }
}