// letterNav.js
import { mainTargetDiv,sideBar, sideBarLinks } from './main-script.js';

// This should probably be exported from main-script.js too
// so we don't create a separate variable here that might get out of sync.
import { mainTargetDivFocused } from './main-script.js'; 
export let lastClickedSideLink = null
export let iSideBarLinks = -1
export let sideBarFocused = false


let lastLetterPressed = null;
function normalizeName(el) {
    return (el.textContent || el.getAttribute('aria-label') || el.id || "")
        .trim()
        .toLowerCase();
}
export function letterNav() {
    window.addEventListener('keydown', e => {
        const key = e.key.toLowerCase();
        // Only run when mainTargetDiv is NOT focused
        if (mainTargetDivFocused) return;
        // Ignore typing in inputs, textareas, or editable elements
        if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName) || document.activeElement.isContentEditable) {return;}
        if (key.length !== 1 || !/^[a-z0-9]$/.test(key)) return; // only letters/numbers
        if (key === 'f') {
            e.preventDefault();
            console.log('skljf')
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
        const allEls = [...document.querySelectorAll('a, button , [id]')].filter(el => {
            const rect = el.getBoundingClientRect();
            return el.offsetParent !== null && rect.width > 0 && rect.height > 0;
        });
        const activeIndex = allEls.indexOf(document.activeElement);
        const matchingEls = allEls.filter(el => normalizeName(el).startsWith(key));
        if (!matchingEls.length) return;
        let target;
        if (key !== lastLetterPressed) {
            // New letter press
            if (e.shiftKey) {
                target = [...matchingEls].reverse().find(el => allEls.indexOf(el) < activeIndex) 
                      || matchingEls[matchingEls.length - 1];
            } else {
                target = matchingEls.find(el => allEls.indexOf(el) > activeIndex) 
                      || matchingEls[0];
            }
        } else {
            // Same letter — cycle through
            let found = false;
            for (let i = activeIndex + 1; i < allEls.length; i++) {
                if (normalizeName(allEls[i]).startsWith(key)) {
                    target = allEls[i];
                    found = true;
                    break;
                }
            }
            if (!found) {
                target = matchingEls[0]; // wrap around
            }
        }
        
        
        lastLetterPressed = key;
        target?.focus();
    });
}
