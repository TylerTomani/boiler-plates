export const sideBarLinks = [...document.querySelectorAll('.side-bar-links-ul > li > a')];
let mainTargetDivFocused = false;

export function initNumFocus(mainTargetDiv) {
    mainTargetDiv.addEventListener('focus', () => mainTargetDivFocused = true);
    mainTargetDiv.addEventListener('blur', () => mainTargetDivFocused = false);
}

export function numFocus(key, e) {
    if (mainTargetDivFocused) return;

    e.preventDefault();
    e.stopPropagation();

    const intLet = parseInt(key, 10);
    if (!isNaN(intLet) && intLet >= 1 && intLet <= sideBarLinks.length) {
        sideBarLinks[intLet - 1]?.focus();
    }
}
