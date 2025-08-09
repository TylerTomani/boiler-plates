import { mainTargetDiv } from "./main-script.js";
import { numFocus } from "./numFocus.js";
let sideBarFocused = false
export function letterFocus(e,key) {
    // Prevent multiple listeners
    if (window._keyboardFocusSidebarInitialized) return;
    window._keyboardFocusSidebarInitialized = true;

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
        if (!text && el.id === 'sideBarBtn') text = 'sidebar';
        if (el.id === 'navLessonTitle') text = 'navLessonTitle';

        // collapse whitespace
        text = text.replace(/\s+/g, ' ');

        // If it starts with "1. " or "12. " remove that numeric prefix
        text = text.replace(/^\d+\.\s*/, '');

        // remove any leading non-alphanumeric characters (like arrows, brackets)
        text = text.replace(/^[^a-z0-9]+/, '');

        return text;
    }

    // key handler
    document.addEventListener('keydown', function (e) {
        // ignore typing in inputs/textareas
        if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;

        const key = (e.key || '').toLowerCase();
        if (key.length !== 1 || !/^[a-z0-9]$/.test(key)) return;

        // Collect all candidate elements (anchors, buttons, any tabindex, or elements with id)
        const allEls = [...document.querySelectorAll('a, button, [tabindex], [id]')].filter(el => {
            // ignore explicit tabindex="-1"
            const t = el.getAttribute && el.getAttribute('tabindex');
            if (t === '-1') return false;

            // always include sideBarBtn even if bounding rect is weird
            if (el.id === 'sideBarBtn') return true;
            if (el.id === 'navLessonTitle') return true;

            const rect = el.getBoundingClientRect();
            return el.offsetParent !== null && rect.width > 0 && rect.height > 0;
        });

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
            if ((el.id === 'sideBarBtn' || el.id === 'navLessonTitle') && normalizeName(el).startsWith(key)) return true;
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

        console.log(key)
        
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
