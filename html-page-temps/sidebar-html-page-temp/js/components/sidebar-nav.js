import { sideBarLinks } from "../main-script.js";
let iSideBarLinks = 0
export function sideBarNav(key,e){
    if (key === 'f') {
        e.preventDefault();
        if (e.shiftKey) {
            iSideBarLinks = (iSideBarLinks - 1 + sideBarLinks.length) % sideBarLinks.length;
        } else {
            iSideBarLinks = (iSideBarLinks + 1) % sideBarLinks.length;
        }
        sideBarLinks[iSideBarLinks]?.focus();
        return;
    }
    if (key === 'a') {
        e.preventDefault();
        iSideBarLinks = (iSideBarLinks - 1 + sideBarLinks.length) % sideBarLinks.length;
        sideBarLinks[iSideBarLinks]?.focus();
        return;
    }
}