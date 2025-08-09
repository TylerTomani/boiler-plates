import { numFocus } from './numFocus.js';
import { letterFocus } from './letterFocus.js';
const sideBar = document.querySelector('.side-bar');
export function keyboardFocusSidebar() {
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        const key = e.key.toLowerCase();
        if (key.length !== 1 || !/^[a-z0-9]$/.test(key)) return;
        if (!isNaN(parseInt(key))) {
            numFocus(key, e,sideBar);  // pass event so you can preventDefault or stopPropagation there
        } else {
            letterFocus(key, e);
        }
    });
}
