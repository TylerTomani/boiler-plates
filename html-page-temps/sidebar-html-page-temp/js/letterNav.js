// letterNav.js
import { FocusManager } from "./components/focusManager.js";
import { sideBarBtn } from "./components/toggle-sidebar.js";
import {
    sideBarLinks,
    mainTargetDiv,
    lastClickedSideLink,       // ← correct variable name
    lastFocusedSideBarLink,
    sideBar,
    mainContainer,             // make sure this is exported in main-script.js
} from "./main-script.js";
/** Normalize a readable name for an element */
function normalizeName(el) {
    let text = (el.innerText || "").trim().toLowerCase();
    if (!text) {
        text = (
            el.getAttribute("data-keyfocus") ||
            el.getAttribute("aria-label") ||
            el.getAttribute("title") ||
            ""
        ).trim().toLowerCase();
    }
    if (el.id === "sideBarBtn") text = "sidebar";
    if (el.id === "navLessonTitle") text = "navLessonTitle";
    if (el.id === "mainTargetDiv") text = "mainTargetDiv";

    return text.replace(/\s+/g, " ")
        .replace(/^\d+\.\s*/, "")
        .replace(/^[^a-z0-9]+/, "");
}
function isCollapsed() {
    return !!(
        (mainContainer && mainContainer.classList.contains("collapsed")) ||
        (sideBar && sideBar.classList.contains("collapsed"))
    );
}
function expandSidebarAndFocusBtn() {
    // Remove either possible collapsed flag
    if (mainContainer && mainContainer.classList.contains("collapsed")) {
        mainContainer.classList.remove("collapsed");
    }
    if (sideBar && sideBar.classList.contains("collapsed")) {
        sideBar.classList.remove("collapsed");
    }
    // Focus after layout updates
    requestAnimationFrame(() => {
        sideBarBtn?.focus();
    });
}

export function letterNav() {
    // Use capture so we run even if a focused widget stops propagation.
    window.addEventListener("keydown", (e) => {
        const key = e.key.toLowerCase();
        const active = document.activeElement;

        // ---------- F → next sidebar link ----------
        if (key === "f" && !e.metaKey && !e.ctrlKey && !e.altKey) {
            e.preventDefault();

            if (mainTargetDiv === document.activeElement) {
                // Instead of sidebar nav, run injected HTML "next step"
                const nextStep = document.querySelector(".step.active + .step");
                if (nextStep) nextStep.focus();
                return;
            }

            // === existing sidebar navigation code ===
            if (isCollapsed() && !sideBar.contains(active)) {
                expandSidebarAndFocusBtn();
                return;
            }
            const idx = sideBarLinks.indexOf(active);
            if (idx !== -1) {
                sideBarLinks[(idx + 1) % sideBarLinks.length].focus();
                return;
            }
            if (lastClickedSideLink) {
                const i = sideBarLinks.indexOf(lastClickedSideLink);
                sideBarLinks[(i + 1 + sideBarLinks.length) % sideBarLinks.length].focus();
                return;
            }
            if (lastFocusedSideBarLink) {
                const i = sideBarLinks.indexOf(lastFocusedSideBarLink);
                sideBarLinks[(i + 1 + sideBarLinks.length) % sideBarLinks.length].focus();
                return;
            }
            if (sideBarLinks.length) sideBarLinks[0].focus();
            return;
        }
        // ---------- A → next sidebar link ----------
        if (key === "a" && !e.metaKey && !e.ctrlKey && !e.altKey) {
            e.preventDefault();

            if (mainTargetDiv === document.activeElement) {
                // Injected HTML "previous step"
                const prevStep = document.querySelector(".step.active")?.previousElementSibling;
                if (prevStep && prevStep.classList.contains("step")) {
                    prevStep.focus();
                }
                return;
            }

            // === existing sidebar navigation code ===
            if (isCollapsed() && !sideBar.contains(active)) {
                expandSidebarAndFocusBtn();
                return;
            }
            const idx = sideBarLinks.indexOf(active);
            if (idx !== -1) {
                const prev = (idx - 1 + sideBarLinks.length) % sideBarLinks.length;
                sideBarLinks[prev].focus();
                return;
            }
            if (lastClickedSideLink) {
                const i = sideBarLinks.indexOf(lastClickedSideLink);
                const prev = (i - 1 + sideBarLinks.length) % sideBarLinks.length;
                sideBarLinks[prev].focus();
                return;
            }
            if (lastFocusedSideBarLink) {
                const i = sideBarLinks.indexOf(lastFocusedSideBarLink);
                const prev = (i - 1 + sideBarLinks.length) % sideBarLinks.length;
                sideBarLinks[prev].focus();
                return;
            }
            if (sideBarLinks.length) sideBarLinks[sideBarLinks.length - 1].focus();
            return;
        }


        // Ignore meta/ctrl/alt for the rest
        if (e.metaKey || e.ctrlKey || e.altKey) return;

        // ---------- 'm' → if focus is inside sidebar, go to mainTargetDiv ----------
        if (key === "m" && sideBar.contains(active)) {
            e.preventDefault();
            mainTargetDiv?.focus();
            return;
        }

        // ---------- 's' → expand/toggle/fallback ----------
        if (key === "s") {
            e.preventDefault();

            // 0) If collapsed & focus is NOT inside sidebar → expand & focus button
            if (isCollapsed() && !sideBar.contains(active)) {
                expandSidebarAndFocusBtn();
                return;
            }

            // 1) If a sidebar link is focused → go to sidebar button
            if (sideBarLinks.includes(active)) {
                sideBarBtn?.focus();
                return;
            }

            // 2) If sidebar button is focused → go to last clicked/focused/first
            if (sideBarBtn === active) {
                if (lastClickedSideLink) { lastClickedSideLink.focus(); return; }
                if (lastFocusedSideBarLink) { lastFocusedSideBarLink.focus(); return; }
                if (sideBarLinks.length) { sideBarLinks[0].focus(); return; }
            }

            // 3) If outside the sidebar → go to last clicked/focused/first
            if (!sideBar.contains(active)) {
                if (lastClickedSideLink) { lastClickedSideLink.focus(); return; }
                if (lastFocusedSideBarLink) { lastFocusedSideBarLink.focus(); return; }
                if (sideBarLinks.length) { sideBarLinks[0].focus(); return; }
            }

            // 4) Fallback: cycle any element starting with 's'
            const focusableEls = [
                sideBarBtn,
                ...sideBarLinks,
                mainTargetDiv,
                ...Array.from(document.querySelectorAll("[tabindex='0'], a, button")),
            ].filter(Boolean);

            const matchingEls = focusableEls.filter((el) =>
                normalizeName(el).startsWith("s")
            );
            if (matchingEls.length) {
                let nextIndex = matchingEls.indexOf(active) + 1;
                if (nextIndex >= matchingEls.length) nextIndex = 0;
                matchingEls[nextIndex].focus();
            }
            return;
        }

        // ---------- Normal letter navigation (a–z) ----------
        if (!/^[a-z]$/.test(key)) return;

        const headerEls = Array.from(
            document.querySelectorAll("header a, header button, header [tabindex='0']")
        );
        const steps = FocusManager.isMainFocused
            ? Array.from(document.querySelectorAll(".step"))
            : [];

        const focusableEls = [
            ...headerEls,
            sideBarBtn,
            ...sideBarLinks,
            mainTargetDiv,
            ...steps,
        ].filter(Boolean);

        const matchingEls = focusableEls.filter((el) =>
            normalizeName(el).startsWith(key)
        );
        if (!matchingEls.length) return;

        let nextIndex = matchingEls.indexOf(active) + 1;
        if (nextIndex >= matchingEls.length) nextIndex = 0;
        matchingEls[nextIndex].focus();
    }, true); // ← capture: true (crucial)
}
