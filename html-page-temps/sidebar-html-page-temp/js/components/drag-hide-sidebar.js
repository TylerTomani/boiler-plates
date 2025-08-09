import { mainContainer } from "../main-script.js";

export function dragHideSidebar() {
    let startX, endX;
    
    sideBar.addEventListener('touchstart', (e) => {
        startX = e.changedTouches[0].clientX;
    });

    sideBar.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        const swipeDistance = endX - startX;

        if (swipeDistance < -50 && !sideBar.classList.contains('collapsed')) {
            mainContainer.classList.toggle('collapsed');
        }
        // if (swipeDistance > 50 && sideBar.classList.contains('hidden')) {
        //    mainContainer.classList.toggle('hidden');
        // }
    });
}