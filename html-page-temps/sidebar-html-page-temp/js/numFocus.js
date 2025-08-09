import { isSideBarFocused } from "./main-script.js";
export function numFocus(key, e,sideBar) {
    e.preventDefault();
    e.stopPropagation();
    const intLet = parent.parseInt(key)
    // Get sidebar links
    const sideBarLinks = [...document.querySelectorAll('.side-bar-links-ul > li > a')];
    if(isSideBarFocused){
        sideBarLinks[intLet - 1]?.focus();
    }
}
