// main-script.js
import { letterNav } from './letterNav.js';
import { injectContent } from './inject-content.js';
import { togggleSidebar } from './components/toggle-sidebar.js';
import { dragHideSidebar } from './components/drag-hide-sidebar.js';

export const mainTargetDiv = document.querySelector('#mainTargetDiv');
export const mainContainer = document.querySelector('.main-container');
export const sideBar = document.querySelector('.side-bar');
export const cnavLessonTitle = document.querySelector('#navLessonTitle');

export let mainTargetDivFocused = false;
export const sideBarLinks = document.querySelectorAll('.sidebar-links-ul li a');
// change this for now when autofocus is on sidebar-links-ul
export let iSideBarLinks = 0


// Track focus state
mainTargetDiv.addEventListener('focusin', () => mainTargetDivFocused = true);
mainTargetDiv.addEventListener('focusout', () => mainTargetDivFocused = false);


// Attach listeners immediately (assuming script is at bottom or type="module")
togggleSidebar();
dragHideSidebar(mainContainer, sideBar);
letterNav(); // letter navigation now self-contained

sideBarLinks.forEach(link => {
    if(link.hasAttribute('autofocus')){
        injectContent(link.href)
        iSideBarLinks = [...sideBarLinks].indexOf(link)
    }
    link.addEventListener('focusin', e => {
        iSideBarLinks = [...sideBarLinks].indexOf(link)
    });

    link.addEventListener('focusout', e => {
    });

    link.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        injectContent(e.currentTarget.href);
    });

    link.addEventListener('keydown', e => {
        if (e.key === "Enter") {
            e.preventDefault();
            e.stopPropagation();
            injectContent(e.currentTarget.href);
        }
    });
});
