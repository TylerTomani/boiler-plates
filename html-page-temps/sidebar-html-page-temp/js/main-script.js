export const mainTargetDiv = document.querySelector('#mainTargetDiv');
export const sideBar = document.querySelector('.side-bar');

import { injectContent } from "./inject-content.js";
import { keyboardFocusSidebar } from "./keyboardFocusSidebar.js";

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
});
