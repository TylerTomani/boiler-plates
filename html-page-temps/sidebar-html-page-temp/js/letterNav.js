function normalizeName(el) {
    return (el.dataset.letter || el.textContent || el.id || "").trim().toLowerCase();
}

export function letterNav() {
    let lastLetter = null;
    let currentIndex = 0;

    document.addEventListener('keydown', e => {
        const key = e.key.toLowerCase();
        if (!/^[a-z0-9]$/.test(key)) return;

        const active = document.activeElement;
        const mainFocused = mainTargetDiv === active;

        const focusableEls = [
            sideBarBtn,
            mainTargetDiv,
            ...document.querySelectorAll('a')
        ];

        // If mainTargetDiv is focused, maybe do number-specific actions instead
        if (mainFocused) {
            if (/^[0-9]$/.test(key)) {
                // number action here
                return;
            }
        }

        const matchingEls = focusableEls.filter(el => normalizeName(el).startsWith(key));
        if (!matchingEls.length) return;

        // Cycle through matchingEls
        let nextIndex = matchingEls.indexOf(active) + 1;
        if (nextIndex >= matchingEls.length) nextIndex = 0;

        matchingEls[nextIndex].focus();
        lastLetter = key;
        e.preventDefault();
    });
}
