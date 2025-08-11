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

// Track focus state
mainTargetDiv.addEventListener('focusin', () => mainTargetDivFocused = true);
mainTargetDiv.addEventListener('focusout', () => mainTargetDivFocused = false);

// Attach listeners immediately (assuming script is at bottom or type="module")
togggleSidebar(mainContainer);
dragHideSidebar(mainContainer, sideBar);
letterNav(); // letter navigation now self-contained

sideBarLinks.forEach(link => {
    link.addEventListener('focusin', e => {
        // console.log("Focus in:", e.currentTarget);
    });

    link.addEventListener('focusout', e => {
        // console.log("Focus out:", e.currentTarget);
    });

    link.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        // console.log("Clicked link:", e.currentTarget.href);
    });

    link.addEventListener('keydown', e => {
        console.log("target", e.key, "on", e.target);
        console.log("currentTarget:", e.key, "on", e.currentTarget);
        if (e.key === "Enter") {
            e.preventDefault();
            e.stopPropagation();
            injectContent(e.currentTarget.href);
        }
    });
});
