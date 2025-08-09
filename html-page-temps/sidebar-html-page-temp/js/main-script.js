import { injectContent } from "./inject-content.js";
import { keyboardFocusSidebar } from "./keyboardFocusSidebar.js";
import { togggleSidebar } from "./components/toggle-sidebar.js";
import { dragHideSidebar } from "./components/drag-hide-sidebar.js";
export const mainContainer = document.querySelector('.main-container');
export const mainTargetDiv = document.querySelector('#mainTargetDiv');
export const sideBar = document.querySelector('.side-bar');
export const sideBarBtn = document.querySelector('#sideBarBtn');
export const navLessonTitle = document.querySelector('#navLessonTitle');
let sideBarFocused = false;


[navLessonTitle,sideBarBtn,sideBar].forEach(el => {
    el.addEventListener('keydown', (e) => {
        // Handle Enter and Space keys for toggling sidebar
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault(); // Prevent default action for Enter/Space
            console.log(e.target)
            togggleSidebar(e,mainContainer);
            if (el === sideBarBtn) {
                e.stopPropagation();
            }
            if (el === navLessonTitle) {
                e.stopPropagation();
            }
        }
        if (e.key === 'Escape') { // Close sidebar on Escape key
            if (!sideBar.classList.contains('collapsed')) {
            togggleSidebar(mainContainer,e);
            }
        }
    })
    el.addEventListener('click', e =>{
        e.preventDefault(); // Prevent default action
        e.stopPropagation()
        togggleSidebar(e,mainContainer)
    });
})

sideBar.addEventListener('focusin', () => {
  sideBarFocused = true;
});
sideBar.addEventListener('focusout', () => {
  sideBarFocused = false;
});

export function isSideBarFocused() {
  return sideBarFocused;
}


const sideBarLinks = document.querySelectorAll('.side-bar-links-ul li a');

document.addEventListener('DOMContentLoaded', () => {
    // Attach link click events
    sideBarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            injectContent(link.getAttribute('href'));
        });
    });

    // Initialize keyboard focus navigation ONCE
    keyboardFocusSidebar();
    togggleSidebar()
    dragHideSidebar
});
