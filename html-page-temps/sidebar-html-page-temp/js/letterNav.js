import { FocusManager } from "./components/focusManager.js";
import { sideBarBtn } from "./components/toggle-sidebar.js";
import { sideBarLinks, mainTargetDiv, lastClickedSideLink, lastFocusedSideBarLink, sideBar } from './main-script.js';

function normalizeName(el) {
    let text = (el.innerText || '').trim().toLowerCase();
    if (!text) {
        text = (el.getAttribute('data-keyfocus') ||
            el.getAttribute('aria-label') ||
            el.getAttribute('title') ||
            '').trim().toLowerCase();
    }

    if (el.id === 'sideBarBtn') text = 'sidebar';
    if (el.id === 'navLessonTitle') text = 'navLessonTitle';
    if (el.id === 'mainTargetDiv') text = 'mainTargetDiv';

    return text.replace(/\s+/g, ' ')
        .replace(/^\d+\.\s*/, '')
        .replace(/^[^a-z0-9]+/, '');
}

export function letterNav() {
    let lastLetter = null;

    document.addEventListener('keydown', (e) => {
        const key = e.key.toLowerCase();
        const active = document.activeElement;

        // ----- Shift+F → next sidebar link -----
        if (e.shiftKey && key === 'f') {
            e.preventDefault();
            let currentIndex = sideBarLinks.indexOf(active);

            // If focused inside sidebar → go to next link
            if (currentIndex !== -1) {
                let nextIndex = (currentIndex + 1) % sideBarLinks.length;
                sideBarLinks[nextIndex].focus();
                return;
            }

            // If outside sidebar → focus lastClicked / lastFocused / first, then next
            if (lastClickedSideLink) {
                let idx = sideBarLinks.indexOf(lastClickedSideLink);
                sideBarLinks[(idx + 1) % sideBarLinks.length].focus();
                return;
            }
            if (lastFocusedSideBarLink) {
                let idx = sideBarLinks.indexOf(lastFocusedSideBarLink);
                sideBarLinks[(idx + 1) % sideBarLinks.length].focus();
                return;
            }
            if (sideBarLinks.length) {
                sideBarLinks[0].focus();
                return;
            }
        }

        // ----- Shift+E → previous sidebar link -----
        if (e.shiftKey && key === 'e') {
            e.preventDefault();
            let currentIndex = sideBarLinks.indexOf(active);

            // If focused inside sidebar → go to previous link
            if (currentIndex !== -1) {
                let prevIndex = (currentIndex - 1 + sideBarLinks.length) % sideBarLinks.length;
                sideBarLinks[prevIndex].focus();
                return;
            }

            // If outside sidebar → focus lastClicked / lastFocused / first, then previous
            if (lastClickedSideLink) {
                let idx = sideBarLinks.indexOf(lastClickedSideLink);
                let prevIndex = (idx - 1 + sideBarLinks.length) % sideBarLinks.length;
                sideBarLinks[prevIndex].focus();
                return;
            }
            if (lastFocusedSideBarLink) {
                let idx = sideBarLinks.indexOf(lastFocusedSideBarLink);
                let prevIndex = (idx - 1 + sideBarLinks.length) % sideBarLinks.length;
                sideBarLinks[prevIndex].focus();
                return;
            }
            if (sideBarLinks.length) {
                sideBarLinks[sideBarLinks.length - 1].focus();
                return;
            }
        }

        // Ignore meta/ctrl/alt
        if (e.metaKey || e.ctrlKey || e.altKey) return;

        // ----- 'm' key → sidebar → mainTargetDiv
        if (key === 'm' && sideBar.contains(active)) {
            e.preventDefault();
            mainTargetDiv.focus();
            return;
        }

        // ----- 's' key → toggle/fallback logic
        if (key === 's') {
            e.preventDefault();

            // 1️⃣ Sidebar link focused → go to sidebar button
            if (sideBarLinks.includes(active)) {
                sideBarBtn.focus();
                return;
            }

            // 2️⃣ Sidebar button → toggle to lastClickedSideBarLink / lastFocusedSideBarLink / first
            if (sideBarBtn === active) {
                if (lastClickedSideLink) { lastClickedSideLink.focus(); return; }
                if (lastFocusedSideBarLink) { lastFocusedSideBarLink.focus(); return; }
                if (sideBarLinks.length) { sideBarLinks[0].focus(); return; }
            }

            // 3️⃣ Outside sidebar → lastClickedSideBarLink / lastFocusedSideBarLink / first
            if (!sideBarLinks.includes(active)) {
                if (lastClickedSideLink) { lastClickedSideLink.focus(); return; }
                if (lastFocusedSideBarLink) { lastFocusedSideBarLink.focus(); return; }
                if (sideBarLinks.length) { sideBarLinks[0].focus(); return; }
            }

            // 4️⃣ Fallback: cycle elements starting with 's'
            const focusableEls = [
                sideBarBtn,
                ...sideBarLinks,
                mainTargetDiv,
                ...Array.from(document.querySelectorAll('[tabindex="0"], a, button'))
            ].filter(Boolean);

            const matchingEls = focusableEls.filter(el => normalizeName(el).startsWith('s'));
            if (matchingEls.length) {
                let nextIndex = matchingEls.indexOf(active) + 1;
                if (nextIndex >= matchingEls.length) nextIndex = 0;
                matchingEls[nextIndex].focus();
            }
            return;
        }

        // ----- Normal letter navigation -----
        const headerEls = Array.from(document.querySelectorAll('header a, header button, header [tabindex="0"]'));
        const steps = FocusManager.isMainFocused ? Array.from(document.querySelectorAll('.step')) : [];

        const focusableEls = [
            ...headerEls,
            sideBarBtn,
            ...sideBarLinks,
            mainTargetDiv,
            ...steps
        ].filter(Boolean);

        const matchingEls = focusableEls.filter(el => normalizeName(el).startsWith(key));
        if (!matchingEls.length) return;

        let nextIndex = matchingEls.indexOf(active) + 1;
        if (nextIndex >= matchingEls.length) nextIndex = 0;
        matchingEls[nextIndex].focus();
        lastLetter = key;
    });
}
