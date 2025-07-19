export function letterFocus(){
    document.addEventListener('DOMContentLoaded', e => {
    /** 
    Create a function that checks for backlink, if not and "B" is pressed, focus should also cycle to the #homelink a element
    but only if there is no #backlink a element
    */
    // const mainLinks = document.querySelectorAll('.main-links > a')
    // function checkBacklinkInMainLinks(){
    //     mainLinks.forEach(el => {
            
    //     })
    // }
    document.addEventListener('keydown', e => {
        const versionArr = [...document.querySelectorAll('.version')]
        const key = e.key.toLowerCase();
        // if (key.length !== 1 || !/^[a-z0-9]$/.test(key)) return;
        const allIds = [...document.querySelectorAll('[id]')].filter(id => {
            const rect = id.getBoundingClientRect();
            return id.offsetParent !== null && rect.width > 0 && rect.height > 0;
        });
        
        const backlink = document.querySelector('.main-links > a#backlink');
        const homelink = document.querySelector('#homelink');
        let letteredIds = allIds.filter(el => {
            const idText = el.id.toLowerCase();
            if (key === 'b') {
                // If 'b' is pressed and there's NO backlink, include homelink in the list
                if (!backlink && homelink && !idText.startsWith('b')) {
                    // Temporarily treat homelink as if it starts with "b"
                    return el === homelink || idText.startsWith('b');
                }
            }
            return idText.startsWith(key);
        });

        // if (letteredIds.length === 0) return;
        const active = document.activeElement;
        const iActiveId = [...allIds].indexOf(active);
        const currentIndexInFiltered = letteredIds.indexOf(active);

        if (!isNaN(e.key)) {
            let intKey = parseInt(key)
            versionArr[intKey - 1].focus()
        }
        if (key !== window.lastLetterPressed) {
            // New letter pressed
            let iLetter;
            if (e.shiftKey) {
                // Shift + new letter = move UP from current position
                const prev = [...letteredIds].reverse().find(a => allIds.indexOf(a) < iActiveId);
                iLetter = letteredIds.indexOf(prev);
                if (iLetter === -1) iLetter = letteredIds.length - 1;
            } else {
                // New letter = move DOWN from current position
                const next = letteredIds.find(a => allIds.indexOf(a) > iActiveId);
                iLetter = letteredIds.indexOf(next);
                if (iLetter === -1) iLetter = 0;
            }
            letteredIds[iLetter]?.focus();
        } else {
            // Same letter as last key press
            let iLetter;
            if (e.shiftKey) {
                iLetter = (currentIndexInFiltered - 1 + letteredIds.length) % letteredIds.length;
            } else {
                iLetter = (currentIndexInFiltered + 1) % letteredIds.length;
            }
            letteredIds[iLetter]?.focus();
        }

        window.lastLetterPressed = key;
        
    });

})
}
letterFocus()