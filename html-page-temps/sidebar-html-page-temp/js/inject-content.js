import { mainTargetDiv } from "./main-script.js";

export function injectContent(href) {
    fetch(href)
        .then(response => response.text())
        .then(html => {
            mainTargetDiv.innerHTML = html;
        })
        .catch(err => console.error('Failed to load content:', err));
}
