import { sideBarNav } from './components/sidebar-nav.js'
import { numFocus } from './numFocus.js'
import { letterNav } from './letterNav.js'
import { injectContent } from './inject-content.js'
import { togggleSidebar } from './components/toggle-sidebar.js'
import { sideBarBtn } from './components/toggle-sidebar.js'
import { dragHideSidebar } from './components/drag-hide-sidebar.js'


export const mainTargetDiv = document.querySelector('#mainTargetDiv')
export const mainContainer = document.querySelector('.main-container')
export const sideBar = document.querySelector('.side-bar')
export const navLessonTitle = document.querySelector('#navLessonTitle')

export const sideBarLinks = document.querySelectorAll('.sidebar-links-ul li a')
export let iSideBarLinks = 0
export let sideBarFocused = false
export let mainTargetDivFocused = false
let lastFocusedSideBarLink = null
let sideBarLinksFocused = false
// Track focus state
mainTargetDiv.addEventListener('focus', () => mainTargetDivFocused = true)
mainTargetDiv.addEventListener('focusout', () => mainTargetDivFocused = false)
sideBar.addEventListener('focusin', () => sideBarFocused = true)
sideBar.addEventListener('focusout', e => {
    if (!sideBar.contains(e.relatedTarget)) sideBarFocused = false
})
togggleSidebar()
dragHideSidebar(mainContainer, sideBar)
// Initialize sidebar toggles / drag
addEventListener('DOMContentLoaded', () => {
    // Initialize sidebar links
    sideBarLinks.forEach((link, index) => {
        if (link.hasAttribute('autofocus')) {
            injectContent(link.href)
            iSideBarLinks = [...sideBarLinks].indexOf(link)
            lastFocusedSideBarLink = sideBarLinks[iSideBarLinks]
        } else {
            injectContent('home-page.html')
        }
        // Track last focused sidebar link
        link.addEventListener('focus', () => {
            lastFocusedSideBarLink = link;
            iSideBarLinks = index;
            sideBarLinksFocused = true
            
        });
        
        // Optional: reset "focused" state when leaving sidebar links
        link.addEventListener('blur', () => {
            sideBarLinksFocused = false
            // We don’t clear lastFocusedSideBarLink here—so 's' can still restore it
        });

        // Click / key handling
        link.addEventListener('click', e => {
            e.preventDefault();
            e.stopPropagation();
            injectContent(link.href);
        });

        link.addEventListener('keydown', e => {
            const key = e.key.toLowerCase();
            if (key === 'enter') {
                e.preventDefault();
                e.stopPropagation();
                injectContent(link.href);
            }
            if (key === 'm') {
                mainTargetDiv.focus();
            }
        });
    });
    letterNav()
    // Global keydown listener
    // Global keydown
    document.addEventListener('keydown', e => {
        const key = e.key.toLowerCase();

        // Sidebar + 'm' → focus mainTargetDiv
        if (sideBarFocused && key === 'm') {
            e.preventDefault();
            mainTargetDiv.focus();
            return;
        }

        // Press 's' → go to lastFocusedSideBarLink if available
        if (key === 's') {
            console.log(lastFocusedSideBarLink)
            // e.preventDefault();
            // if (lastFocusedSideBarLink && !sideBarLinksFocused){
            //     lastFocusedSideBarLink.focus();
            //     return 
            // } else if(sideBarLinksFocused){
            //     sideBarBtn.focus()
            //     return 
            // }
        }

        // Number keys when mainTargetDiv NOT focused
        if (!mainTargetDivFocused && /^[0-9]$/.test(key)) {
            e.preventDefault();
            numFocus(key, e);
            return;
        }

        // Letters/numbers when mainTargetDiv is focused
        if (mainTargetDivFocused && /^[0-9a-z]$/.test(key)) {
            e.preventDefault();
            // stepTxt(key, e) // future
            return;
        }

        // Letters handled by sidebar-nav (f, a, shift+f)
        sideBarNav(key, e, iSideBarLinks, lastFocusedSideBarLink);
    });
})
