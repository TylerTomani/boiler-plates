// js/components/focusManager.js
export const FocusManager = (() => {
    let mainTargetDiv = null;
    let sidebarLinks = [];
    let currentSteps = [];
    let isMainFocused = false;

    // Set mainTargetDiv and track focus
    const setMainTargetDiv = (el) => {
        mainTargetDiv = el;
        mainTargetDiv.addEventListener('focusin', () => {
            isMainFocused = true;
        });
        mainTargetDiv.addEventListener('focusout', (e) => {
            if (!mainTargetDiv.contains(e.relatedTarget)) isMainFocused = false;
        });
    };

    // Provide sidebar links
    const setSidebarLinks = (links) => {
        sidebarLinks = Array.from(links);
    };

    // Update steps whenever content is injected
    const setSteps = (steps) => {
        currentSteps = Array.from(steps);
    };

    // Focus the number-th element depending on where focus is
    const focusNumber = (num) => {
        const index = num - 1;
        if (!isMainFocused) {
            sidebarLinks[index]?.focus();
        } else {
            const step = currentSteps[index];
            if (step) {
                step.tabIndex = -1; // make focusable
                step.focus();
            }
        }
    };

    return {
        setMainTargetDiv,
        setSidebarLinks,
        setSteps,
        focusNumber,
        get isMainFocused() { return isMainFocused; }
    };
})();
