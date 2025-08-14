// main-script.js
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
export const sideBarLinks = document.querySelectorAll('.sidebar-links-ul li a');

export let iSideBarLinks = 0;
export let sideBarFocused = false;
export let mainTargetDivFocused = false;
export let lastClickedSideLink = null
// place with other module-level vars
export let lastFocusedSideBarLink = null;
let sToggleFromSidebar = false; // track ping-pong state


// ---------- Focus tracking ----------
mainTargetDiv.addEventListener('focus', () => { mainTargetDivFocused = true; });
mainTargetDiv.addEventListener('focusout', () => { mainTargetDivFocused = false; });

sideBar.addEventListener('focusin', () => { sideBarFocused = true; });
sideBar.addEventListener('focusout', (e) => {
    // only mark false if focus moved completely outside the sidebar
    if (!sideBar.contains(e.relatedTarget)) sideBarFocused = false;
});

// ---------- Init sidebar toggle/drag ----------
togggleSidebar();
dragHideSidebar(mainContainer, sideBar);

// ---------- Helpers ----------
const sideBarLinksArr = Array.from(sideBarLinks);
const isSidebarLink = (el) => sideBarLinksArr.includes(el);
const insideSidebar = (el) => el && sideBar.contains(el);

// ---------- DOM ready ----------
document.addEventListener('DOMContentLoaded', () => {
    // Initial content & last focused link
    sideBarLinksArr.forEach((link, index) => {
        if (link.hasAttribute('autofocus')) {
            injectContent(link.href);
            iSideBarLinks = index;
            lastFocusedSideBarLink = link;
            sToggleFromSidebar = false
        }
    });
    if (!lastFocusedSideBarLink) {
        injectContent('home-page.html');
    }

    // Track last focused sidebar link + basic link handlers
    // Track last focused sidebar link + basic link handlers
    sideBarLinksArr.forEach((link, index) => {
        link.addEventListener('focus', () => {
            lastFocusedSideBarLink = link;
            iSideBarLinks = index;
            mainTargetDivFocused = false
            sToggleFromSidebar = false; // reset toggle when entering link
        });

        link.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            injectContent(link.href,e);
            
            lastClickedSideLink = e.target
        });

        link.addEventListener('keydown', (e) => {
            const key = e.key.toLowerCase();
            if (key === 'enter') {
                e.preventDefault();
                e.stopPropagation();
                injectContent(link.href, e);
                const h3Title = mainTargetDiv.querySelector('.header-codeColor-lesson h3')
                navLessonTitle.innerText = e.target.innerText
                if (e.currentTarget == lastClickedSideLink) {
                    mainTargetDiv.focus()
                    
                }
                lastClickedSideLink = e.target
            }
        });
    });


    // Initialize letter navigation exactly once
    letterNav();

    // ---------- HIGH-PRIORITY 'm' (capture) ----------
    // If the event starts inside the sidebar, pressing 'm' must ALWAYS go to mainTargetDiv first.
    // Capture-phase + stopPropagation ensures this beats other listeners (e.g., letterNav).
    window.addEventListener(
        'keydown',
        (e) => {
            const key = e.key.toLowerCase();
            if (e.metaKey || e.ctrlKey || e.altKey) return; // don't touch browser/system shortcuts

            if (key === 'm' && insideSidebar(e.target)) {
                e.preventDefault();
                e.stopPropagation();
                mainTargetDiv.focus();
                return;
            }
        },
        true // <-- capture phase
    );

    // ---------- Global keydown (bubble) ----------
    document.addEventListener('keydown', (e) => {
        const key = e.key.toLowerCase();

        // Don't interfere with browser/system shortcuts
        if (e.metaKey || e.ctrlKey || e.altKey) return;

        // 1) Sidebar-focused + 'm' (redundant safety net, in case capture didn't catch)
        if (sideBarFocused && key === 'm') {
            e.preventDefault();
            mainTargetDiv.focus();
            return;
        }

        // 2) 's' toggle:
        //    - If a sidebar link is focused → go to sidebar button
        //    - Otherwise, if we have a last focused link → go back to it
        
        document.addEventListener('keydown', (e) => {
            const key = e.key.toLowerCase();
            if (e.metaKey || e.ctrlKey || e.altKey) return;

            const active = document.activeElement;

            // Shift+S goes directly to sidebar button
            if (key === 's' && e.shiftKey) {
                e.preventDefault();
                sideBarBtn.focus();
                return;
            }

            // Ping-pong 's' toggle
            if (key === 's' && !e.shiftKey) {
                e.preventDefault();

                // CASE 1: From sidebar link → go to sidebar button
                

                // CASE 2: From sidebar button → go back to last focused link
                if (active === sideBarBtn && sToggleFromSidebar && lastFocusedSideBarLink) {
                    (lastClickedSideLink || lastFocusedSideBarLink).focus();
                    sToggleFromSidebar = false;
                    return;
                }

                // CASE 3: From anywhere else → go to last focused link
                if (lastFocusedSideBarLink) {
                    lastFocusedSideBarLink.focus();
                    sToggleFromSidebar = false;
                }
                return;
            }
        });




        // 3) Number keys only when mainTargetDiv is NOT focused
        if (!mainTargetDivFocused && /^[0-9]$/.test(key)) {
            e.preventDefault();
            numFocus(key, e);
            return;
        }

        // 4) (Future) mainTargetDiv-specific letters/numbers
        if (mainTargetDivFocused && /^[0-9a-z]$/.test(key)) {
            e.preventDefault();
            
            // stepTxtsFocus(key, e) // implement later
            return;
        }

        // 5) Sidebar nav helpers (handles 'f', 'a', 'Shift+f', etc.)
        sideBarNav(key, e, iSideBarLinks, lastFocusedSideBarLink);
        // NOTE: sideBarNav should call preventDefault itself only for keys it handles.
    });
});
