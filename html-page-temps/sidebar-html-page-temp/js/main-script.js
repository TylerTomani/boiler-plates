// import { injectContent } from "./inject-content";
import { injectContent, mainTargetDiv } from "./inject-content.js";

const sideBarLinks = document.querySelectorAll('.side-bar-links-ul li a');
addEventListener('DOMContentLoaded', () => {
    sideBarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            console.log(href)
            injectContent(href);
        })
    })
})
