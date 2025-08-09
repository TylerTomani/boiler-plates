import { mainTargetDiv } from "./main-script.js";
import { sideBarBtn } from "./main-script.js";
import { sideBar } from "./main-script.js";
import { numFocus } from "./numFocus.js";
import {isSideBarFocused} from "./main-script.js";
import { sideBarLinks } from "./numFocus.js";
let iSideBarLinks = -1
let lastFocusedSideBarLink = null;
let lastClickedSideBarLink = null;
let sideBarLinksFocused = true
// <-- ADD THIS INIT CODE HERE -->
window.addEventListener('DOMContentLoaded', () => {
  const focusedEl = document.activeElement;
  if (
    (focusedEl === sideBarBtn || sideBar.contains(focusedEl)) &&
    !lastFocusedSideBarLink
  ) {
    lastFocusedSideBarLink = sideBarLinks[0];
    iSideBarLinks = 0;
  }
});
export function letterFocus(e,key) {
    // Prevent multiple listeners
    if (window._keyboardFocusSidebarInitialized) return;
    window._keyboardFocusSidebarInitialized = true;
    let sideBarFocused = isSideBarFocused()
    
    // Normalize and get text used for matching
    function normalizeName(el) {
        let text = (el.innerText || '').trim().toLowerCase();

        if (!text) {
            text = (el.getAttribute('data-keyfocus') ||
                    el.getAttribute('aria-label') ||
                    el.getAttribute('title') ||
                    '').trim().toLowerCase();
        }

        // fallback specific label for sideBarBtn so icon-only still matches 's'
        if (!text && el.id === 'sideBarBtn'){
            text = 'sidebar';
            if(!lastFocusedSideBarLink){
                iSideBarLinks = -1
            }
        } 
        if (el.id === 'navLessonTitle') text = 'navLessonTitle';
        if (el.id === 'mainTargetDiv') text = 'mainTargetDiv';

        // collapse whitespace
        text = text.replace(/\s+/g, ' ');

        // If it starts with "1. " or "12. " remove that numeric prefix
        text = text.replace(/^\d+\.\s*/, '');

        // remove any leading non-alphanumeric characters (like arrows, brackets)
        text = text.replace(/^[^a-z0-9]+/, '');

        return text;
    }
    if(sideBarBtn.hasAttribute('autofocus') ){
        sideBarFocused = true
        console.log(sideBarFocused)
    }
    sideBarBtn.addEventListener('focus', (e) => {
        sideBarFocused = true
        if(lastFocusedSideBarLink){
            // lastFocusedSideBarLink = null;
            iSideBarLinks = -1
            sideBarLinks[iSideBarLinks]?.focus();
            sideBarLinksFocused = false;
        }
        
    })
    // key handler
    sideBarLinks.forEach(link => {
        link.addEventListener('focusin', (e) => {
            console.log('in')
            lastFocusedSideBarLink = e.target;
            iSideBarLinks = sideBarLinks.indexOf(e.target);
            sideBarLinksFocused = true;
        });
        link.addEventListener('focusout', (e) => {
            
            sideBarLinksFocused = false;
        });
        link.addEventListener('click', (e) => {
            lastClickedSideBarLink = e.target
            lastFocusedSideBarLink = e.target;
            iSideBarLinks = sideBarLinks.indexOf(e.target);
        });
        link.addEventListener('keydown', (e) => {
            let key = e.key
            if(key === 'Enter' || key === ' '){
                lastClickedSideBarLink = e.target
                lastFocusedSideBarLink = e.target;
                iSideBarLinks = sideBarLinks.indexOf(e.target);
            }
        });
    })
 document.addEventListener('keydown', function (e) {
    // ignore typing in inputs/textareas
    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;

    const key = (e.key || '').toLowerCase();
    if (key.length !== 1 || !/^[a-z0-9]$/.test(key)) return;

    // Check sidebar focus state each time
    let sideBarFocused = isSideBarFocused();

    // Handle when sidebar is not focused
    if (!sideBarFocused) {
        if (key === 'a') {
            if (lastClickedSideBarLink) {
                lastClickedSideBarLink.focus();
            } else {
                lastFocusedSideBarLink?.focus()
            }
            return;
        }
        if (key === 'f') {
            if (lastFocusedSideBarLink) {
                lastFocusedSideBarLink.focus();
            }
            return;
        }
    }

    // Collect all candidate elements
    const allEls = [...document.querySelectorAll('a, button, [tabindex], [id]')].filter(el => {
        const t = el.getAttribute && el.getAttribute('tabindex');
        if (t === '-1') return false;
        if (el.id === 'sideBarBtn' || el.id === 'navLessonTitle' || el.id === 'mainTargetDiv') return true;

        const rect = el.getBoundingClientRect();
        return el.offsetParent !== null && rect.width > 0 && rect.height > 0;
    });

    if (sideBarFocused) {
        if (key === 'f') {
            if (e.shiftKey) {
                iSideBarLinks = (iSideBarLinks - 1 + sideBarLinks.length) % sideBarLinks.length;
            } else {
                iSideBarLinks = (iSideBarLinks + 1) % sideBarLinks.length;
            }
            sideBarLinks[iSideBarLinks]?.focus();
            return;
        }
        if (key === 'a') {
            iSideBarLinks = (iSideBarLinks - 1 + sideBarLinks.length) % sideBarLinks.length;
            sideBarLinks[iSideBarLinks]?.focus();
            return;
        }
    }

    // ... keep your existing matching logic here ...


        // -------------------
        // Match elements
        // -------------------
        let matchingEls;
        if (!isNaN(parseInt(key))) {
            // Number key → only sidebar links
            return
            // matchingEls = [...document.querySelectorAll('.side-bar-links-ul > li > a')].filter(el => {
            //     return normalizeName(el).startsWith(key);
            // });
        } else {
            // Letter key → match any focusable
            matchingEls = allEls.filter(el => normalizeName(el).startsWith(key));
        }
        if(!isNaN(key)){
            numFocus(key);
            return; 
        }
        // Priority: data-keyfocus and sideBarBtn
        const priorityEls = allEls.filter(el => {
            const dk = (el.getAttribute && el.getAttribute('data-keyfocus') || '').trim().toLowerCase();
            if (dk && dk === key) return true;
            if ((el.id === 'sideBarBtn' || el.id === 'navLessonTitle' || el.id === 'mainTargetDiv') 
                && normalizeName(el).startsWith(key)) return true;
            return false;
        });
        if (priorityEls.length) {
            const set = new Set(priorityEls);
            matchingEls = [...priorityEls, ...matchingEls.filter(el => !set.has(el))];
        }
        if (matchingEls.length === 0) return;

        // -------------------
        // Focus navigation
        // -------------------
        const active = document.activeElement;
        let iActiveAll = allEls.indexOf(active);
        if (iActiveAll === -1) iActiveAll = -1;
            if (key !== window.lastLetterPressed) {
                // NEW LETTER PRESS → forward/backward
                let target;
                if (e.shiftKey) {
                    target = [...matchingEls].reverse().find(el => allEls.indexOf(el) < iActiveAll) ||
                            matchingEls[matchingEls.length - 1];
                } else {
                    target = matchingEls.find(el => allEls.indexOf(el) > iActiveAll) ||
                            matchingEls[0];
                }
                target?.focus();
            } else {
                // SAME LETTER → cycle
                let target = null;
                for (let i = iActiveAll + 1; i < allEls.length; i++) {
                    if (normalizeName(allEls[i]).startsWith(key)) { target = allEls[i]; break; }
                }
                if (!target) {
                    for (let i = 0; i < allEls.length; i++) {
                        if (normalizeName(allEls[i]).startsWith(key)) { target = allEls[i]; break; }
                    }
                }
                target?.focus();
            }

        window.lastLetterPressed = key;
    });
}
