// numFocus.js
import { FocusManager } from './components/focusManager.js';

/**
 * Optional wrapper if you still want a named function.
 * Focuses the number-th element depending on where focus is:
 * - Sidebar links if mainTargetDiv is not focused
 * - Steps inside mainTargetDiv if it is focused
 */
export function numFocus(key) {
    const num = parseInt(key, 10);
    if (isNaN(num)) return;
    FocusManager.focusNumber(num);
}
