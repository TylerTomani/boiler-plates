import { sideBarNav } from './components/sidebar-nav.js';
import { numFocus } from './numFocus.js';
import { letterNav } from './letterNav.js';
import { injectContent } from './inject-content.js';
import { togggleSidebar, sideBarBtn } from './components/toggle-sidebar.js';
import { dragHideSidebar } from './components/drag-hide-sidebar.js';
import { stepTxtsFocus } from './components/stepTxts.js';

export const mainTargetDiv = document.querySelector('#mainTargetDiv');
export const mainContainer = document.querySelector('.main-container');
export const sideBar = document.querySelector('.side-bar');
export const navLessonTitle = document.querySelector('#navLessonTitle');
export const sideBarLinks = Array.from(document.querySelectorAll('.sidebar-links-ul li a'));

export let lastClickedSideLink = null;
export let lastFocusedSideBarLink = null;

// Focus tracking
let mainTargetDivFocused = false;
let sideBarFocused = false;

mainTargetDiv.addEventListener('focus', () => mainTargetDivFocused = true);
mainTargetDiv.addEventListener('blur', () => mainTargetDivFocused = false);
sideBar.addEventListener('focusin', () => sideBarFocused = true);
sideBar.addEventListener('focusout', (e) => {
    if (!sideBar.contains(e.relatedTarget)) sideBarFocused = false;
});

// Initialize sidebar toggle / drag
togggleSidebar();
dragHideSidebar(mainContainer, sideBar);

// Track sidebar focus & clicks
sideBarLinks.forEach(link => {
    // Focus updates lastFocusedSideBarLink
    link.addEventListener('focus', () => {
        lastFocusedSideBarLink = link;
    });

    // Click updates lastClickedSideBarLink
    link.addEventListener('click', (e) => {
        e.preventDefault();
        injectContent(link.href);
        lastClickedSideLink = link;
    });

    // Enter key also counts as "click"
    link.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            injectContent(link.href);
            lastClickedSideLink = link;
        }
    });

    // Optional: autofocus first link
    if (link.hasAttribute('autofocus')) {
        injectContent(link.href);
        lastFocusedSideBarLink = link;
    }
});

// Initialize letter navigation (a–z)
letterNav();

// ----- Global keydown for numbers + sideBarNav -----
document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    const active = document.activeElement;

    if (e.metaKey || e.ctrlKey || e.altKey) return;

    // Number keys
    if (/^[0-9]$/.test(key)) {
        e.preventDefault();
        const num = parseInt(key, 10);

        if (!mainTargetDivFocused) {
            if (num >= 1 && num <= sideBarLinks.length) {
                sideBarLinks[num - 1].focus();
            }
        } else {
            stepTxtsFocus(num);
        }
        return;
    }

    // Other letters handled by letterNav
    sideBarNav(key, e, sideBarLinks, lastFocusedSideBarLink);
});
