import { sideBarLinks, mainTargetDivFocused } from './main-script.js';
import { stepTxtsFocus } from "./components/stepTxts.js";

export function numFocus(key, e) {
    e.preventDefault();
    e.stopPropagation();

    if (!mainTargetDivFocused) {
        const idx = parseInt(key, 10) - 1;
        if (idx >= 0 && idx < sideBarLinks.length) {
            sideBarLinks[idx].focus();
        }
    } else {
        // Inside mainTargetDiv → handle with stepTxtsFocus
        stepTxtsFocus(key, e);
    }
}
