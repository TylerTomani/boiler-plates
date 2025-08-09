
export function dragHideSidebar(mainContainer, sideBar) {
    let startX, endX;
    
    sideBar.addEventListener('touchstart', (e) => {
        startX = e.changedTouches[0].clientX;
    });

    sideBar.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        const swipeDistance = endX - startX;

        if (swipeDistance < -50 && !sideBar.classList.contains('collapsed')) {
            mainContainer.classList.toggle('collapsed');
            alert('Sidebar hidden');
        }
        // if (swipeDistance > 50 && sideBar.classList.contains('hidden')) {
        //    mainContainer.classList.toggle('hidden');
        // }
    });
    // sideBar.addEventListener('mousedown', (e) => {
    //     startX = e.changedTouches[0].clientX;
    //     console.log('down', startX);
    // });

    // sideBar.addEventListener('mouseup', (e) => {        
    //     endX = e.changedTouches[0].clientX;
    //     console.log('up', endX);
    //     const swipeDistance = endX - startX;

    //     if (swipeDistance < -50 && !sideBar.classList.contains('collapsed')) {
    //         mainContainer.classList.toggle('collapsed');
    //         alert('Sidebar hidden');
    //     }
    //     // if (swipeDistance > 50 && sideBar.classList.contains('hidden')) {
    //     //    mainContainer.classList.toggle('hidden');
    //     // }
    // });
}