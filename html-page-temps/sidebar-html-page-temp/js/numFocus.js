let sideBarFocused = true;
export function numFocus(key, e,sideBar) {
    e.preventDefault();
    e.stopPropagation();
    const intLet = parent.parseInt(key)
    // Get sidebar links
    const sideBarLinks = [...document.querySelectorAll('.side-bar-links-ul > li > a')];
    sideBar.addEventListener('focus', () => {
        sideBarFocused = true;
    })
    if(sideBarFocused){
        sideBarLinks[intLet - 1]?.focus();
    }
}
