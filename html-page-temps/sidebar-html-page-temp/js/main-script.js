// main-script.js
import { sideBarNav } from './components/sidebar-nav.js';
import { numFocus } from './numFocus.js';
import { letterNav } from './letterNav.js';
import { injectContent } from './inject-content.js';
import { togggleSidebar } from './components/toggle-sidebar.js';
import { dragHideSidebar } from './components/drag-hide-sidebar.js';

export const mainTargetDiv = document.querySelector('#mainTargetDiv');
export const mainContainer = document.querySelector('.main-container');
export const sideBar = document.querySelector('.side-bar');
export const cnavLessonTitle = document.querySelector('#navLessonTitle');

export const sideBarLinks = document.querySelectorAll('.sidebar-links-ul li a');
// change this for now when autofocus is on sidebar-links-ul
export let iSideBarLinks = 0
export let sideBarFocused = false

export let mainTargetDivFocused = false;
export let lastFocusedSideBarLink = null
// Track focus state
mainTargetDiv.addEventListener('focus', () => setMainTargetDivFocused(true));
mainTargetDiv.addEventListener('focusout', () => setMainTargetDivFocused(false));

sideBar.addEventListener('focusin', () => sideBarFocused = true);
sideBar.addEventListener('focusout', e => {
    // Only set false if the new focus is outside the sidebar
    if (!sideBar.contains(e.relatedTarget)) {
        sideBarFocused = false;
    }
});


export function setMainTargetDivFocused(value) {
    mainTargetDivFocused = value;
}

export function updateMainTargetDivFocused() {
    return mainTargetDivFocused;
}


// Attach listeners immediately (assuming script is at bottom or type="module")
togggleSidebar();
dragHideSidebar(mainContainer, sideBar);

addEventListener('DOMContentLoaded', () =>{
    sideBarLinks.forEach(link => {
        if (link.hasAttribute('autofocus')) {
            injectContent(link.href)
            iSideBarLinks = [...sideBarLinks].indexOf(link)
        } else {
            injectContent('home-page.html')
        }
        link.addEventListener('focusin', e => {
            iSideBarLinks = [...sideBarLinks].indexOf(link)
        });
        link.addEventListener('click', e => {
            e.preventDefault();
            e.stopPropagation();
            injectContent(e.currentTarget.href);
        });
        link.addEventListener('keydown', e => {
            let key = e.key.toLowerCase()

            if (key === "enter") {
                e.preventDefault();
                e.stopPropagation();
                injectContent(e.currentTarget.href);
            }
            if (key === 'm') {
                // e.preventDefault()
                mainTargetDiv.focus()
            }
        });
    });


    if(sideBarFocused && key === 'm') {
        return 
    }
    letterNav(); // letter navigation now self-contained
    addEventListener('keydown', e => {
        const key = e.key.toLowerCase();

        // ✅ 1. If anything inside sidebar has focus and 'm' pressed
        if (sideBarFocused && key === 'm') {
            e.preventDefault();
            mainTargetDiv.focus();
            return;
        }
        if (!sideBarFocused && (key === 's' || key === 'f' || key === 'a')){
            // Add lastFocusedSideBarLink logic here
            e.preventDefault();
            
            return 

        }

        // ✅ 2. Number keys only when mainTargetDiv NOT focused
        if (!mainTargetDivFocused && /^[0-9]$/.test(key)) {
            e.preventDefault();
            numFocus(key, e);
            return;
        }

        // ✅ 3. MainTargetDiv focused — only intercept letters/numbers, let Tab work
        if (mainTargetDivFocused) {
            if (/^[0-9a-z]$/.test(key)) {
                e.preventDefault();
                // stepTxt(key, e); // future
            }
            return; // other keys (Tab, Shift+Tab) behave normally
        }

        // ✅ 4. Letter navigation for other keys
        if (/^[a-z0-9]$/.test(key)) {
            e.preventDefault();
            sideBarNav(key, e, iSideBarLinks);
            letterNav(); // optional
        }
    });


})
