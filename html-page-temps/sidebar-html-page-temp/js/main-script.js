// import { injectContent } from "./inject-content";
import { injectContent, mainTargetDiv } from "./inject-content.js";
import { letterFocus } from "./letterFocus-side-bar-temp.js";

const sideBarLinks = document.querySelectorAll('.side-bar-links-ul li a');
addEventListener('DOMContentLoaded', () => {
    sideBarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            injectContent(href);
            letterFocus();
        })
    })
})
