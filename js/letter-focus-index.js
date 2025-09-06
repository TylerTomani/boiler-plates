document.addEventListener('keydown', function (e) {
    const key = e.key.toLowerCase();

    // ⛔ Don’t interfere with Cmd/Ctrl + C when textarea is active
    if ((e.metaKey || e.ctrlKey) && key === 'c' && document.activeElement.id === 'mainCodeProjectLayout') {
        return; // Let the browser handle "copy"
    }

    if (key.length !== 1 || !/^[a-z0-9]$/.test(key)) return;

    const allFocusable = [...document.querySelectorAll('a, textarea, [tabindex], [id]')].filter(el => {
        const rect = el.getBoundingClientRect();
        return el.offsetParent !== null && rect.width > 0 && rect.height > 0;
    });

    // ✅ Special case for "m"
    if (key === 'm' && window.lastLetterPressed !== 'm') {
        const textarea = document.querySelector('#mainCodeProjectLayout');
        if (textarea) {
            textarea.focus();
            window.lastLetterPressed = key;
            return; // stop here, don’t run normal navigation
        }
    }

    // Default filtering
    const letteredAs = allFocusable.filter(el => {
        const text = (el.tagName === 'TEXTAREA')
            ? el.value.trim().toLowerCase()
            : el.textContent.trim().toLowerCase();

        if (key === 'b') {
            const backlink = document.querySelector('#backlink');
            if (!backlink) {
                return text.startsWith('h');
            } else {
                return text.startsWith('b');
            }
        }
        return text.startsWith(key);
    });

    if (letteredAs.length === 0) return;

    const active = document.activeElement;
    const iActiveA = allFocusable.indexOf(active);
    const currentIndexInFiltered = letteredAs.indexOf(active);

    let iLetter;
    if (key !== window.lastLetterPressed) {
        // New letter pressed
        if (e.shiftKey) {
            // Move UP
            const prev = [...letteredAs].reverse().find(a => allFocusable.indexOf(a) < iActiveA);
            iLetter = letteredAs.indexOf(prev);
            if (iLetter === -1) iLetter = letteredAs.length - 1;
        } else {
            // Move DOWN
            const next = letteredAs.find(a => allFocusable.indexOf(a) > iActiveA);
            iLetter = letteredAs.indexOf(next);
            if (iLetter === -1) iLetter = 0;
        }
    } else {
        // Same letter pressed again = cycle
        if (e.shiftKey) {
            iLetter = (currentIndexInFiltered - 1 + letteredAs.length) % letteredAs.length;
        } else {
            iLetter = (currentIndexInFiltered + 1) % letteredAs.length;
        }
    }

    letteredAs[iLetter]?.focus();
    window.lastLetterPressed = key;
});
