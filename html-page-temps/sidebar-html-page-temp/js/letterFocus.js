import { mainTargetDiv } from "./main-script.js";
import { sideBarBtn, sideBar, isSideBarFocused } from "./main-script.js";
import { numFocus, sideBarLinks } from "./numFocus.js";

let iSideBarLinks = -1;
let lastFocusedSideBarLink = null;
let lastClickedSideBarLink = null;
let sideBarLinksFocused = false;

// Initialize lastFocusedSideBarLink if sidebar or sidebar button is focused at page load
window.addEventListener('DOMContentLoaded', () => {
    // Reset sidebar index when sidebar button gains focus
sideBarBtn.addEventListener('focus', () => {
  iSideBarLinks = -1;
});
  const focusedEl = document.activeElement;
  if ((focusedEl === sideBarBtn || sideBar.contains(focusedEl)) && !lastFocusedSideBarLink) {
    lastFocusedSideBarLink = sideBarLinks[0];
    iSideBarLinks = 0;
  }
});

// Update last focused/clicked sidebar links on interactions
sideBarLinks.forEach(link => {
  link.addEventListener('focusin', (e) => {
    lastFocusedSideBarLink = e.target;
    iSideBarLinks = sideBarLinks.indexOf(e.target);
    sideBarLinksFocused = true;
  });
  link.addEventListener('focusout', (e) => {
    sideBarLinksFocused = false;
  });
  link.addEventListener('click', (e) => {
    lastClickedSideBarLink = e.target;
    lastFocusedSideBarLink = e.target;
    iSideBarLinks = sideBarLinks.indexOf(e.target);
  });
  link.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      lastClickedSideBarLink = e.target;
      lastFocusedSideBarLink = e.target;
      iSideBarLinks = sideBarLinks.indexOf(e.target);
    }
  });
});



// Helper to focus last clicked or last focused sidebar link (or first)
function focusLastSidebarLink() {
  if (lastClickedSideBarLink) {
    lastClickedSideBarLink.focus();
    iSideBarLinks = sideBarLinks.indexOf(lastClickedSideBarLink);
  } else if (lastFocusedSideBarLink) {
    lastFocusedSideBarLink.focus();
    iSideBarLinks = sideBarLinks.indexOf(lastFocusedSideBarLink);
  } else if (sideBarLinks.length > 0) {
    sideBarLinks[0].focus();
    iSideBarLinks = 0;
  }
}

// Normalize element text for matching keys
function normalizeName(el) {
  let text = (el.innerText || '').trim().toLowerCase();

  if (!text) {
    text = (el.getAttribute('data-keyfocus') ||
            el.getAttribute('aria-label') ||
            el.getAttribute('title') ||
            '').trim().toLowerCase();
  }

  if (!text && el.id === 'sideBarBtn') {
    text = 'sidebar';
  }
  if (el.id === 'navLessonTitle') text = 'navLessonTitle';
  if (el.id === 'mainTargetDiv') text = 'mainTargetDiv';

  text = text.replace(/\s+/g, ' ');
  text = text.replace(/^\d+\.\s*/, '');
  text = text.replace(/^[^a-z0-9]+/, '');

  return text;
}

// Main keydown handler — call once to initialize
export function letterFocus() {
  if (window._keyboardFocusSidebarInitialized) return;
  window._keyboardFocusSidebarInitialized = true;

  document.addEventListener('keydown', (e) => {
    // Ignore input/textarea fields
    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;

    const key = (e.key || '').toLowerCase();
    if (key.length !== 1 || !/^[a-z0-9]$/.test(key)) return;

    const sideBarFocused = isSideBarFocused();
    const active = document.activeElement;
    const activeIsSidebarLink = sideBarLinks.includes(active);

    // If sidebar focused but focus NOT on sidebar link (e.g., sidebar button)
    // If sidebar focused but focus NOT on sidebar link (e.g., sidebar button)
if (sideBarFocused && !activeIsSidebarLink) {
  if (key === 'a') {
    e.preventDefault();
    if (lastClickedSideBarLink) {
      lastClickedSideBarLink.focus();
      iSideBarLinks = sideBarLinks.indexOf(lastClickedSideBarLink);
    }
    return;
  }
  if (key === 'f') {
    e.preventDefault();
    if (lastFocusedSideBarLink) {
      lastFocusedSideBarLink.focus();
      iSideBarLinks = sideBarLinks.indexOf(lastFocusedSideBarLink);
    }
    return;
  }
}


    // If sidebar NOT focused — 'a' or 'f' focuses last sidebar link
    if (!sideBarFocused) {
      if (key === 'a') {
        e.preventDefault();
        if (lastClickedSideBarLink) {
          lastClickedSideBarLink.focus();
        } else {
          lastFocusedSideBarLink?.focus();
        }
        return;
      }
      if (key === 'f') {
        e.preventDefault();
        if (lastFocusedSideBarLink) {
          lastFocusedSideBarLink.focus();
        } else {
          lastClickedSideBarLink?.focus();
        }
        return;
      }
    }

    // Sidebar focused and sidebar link active → cycle links with 'a' and 'f'
    if (sideBarFocused && activeIsSidebarLink) {
      if (key === 'f') {
        e.preventDefault();
        if (e.shiftKey) {
          iSideBarLinks = (iSideBarLinks - 1 + sideBarLinks.length) % sideBarLinks.length;
        } else {
          iSideBarLinks = (iSideBarLinks + 1) % sideBarLinks.length;
        }
        sideBarLinks[iSideBarLinks]?.focus();
        return;
      }
      if (key === 'a') {
        e.preventDefault();
        iSideBarLinks = (iSideBarLinks - 1 + sideBarLinks.length) % sideBarLinks.length;
        sideBarLinks[iSideBarLinks]?.focus();
        return;
      }
    }

    // Number keys trigger numFocus helper (your existing logic)
    if (!isNaN(parseInt(key))) {
      numFocus(key,e,sideBar);
      return;
    }

    // Collect all focusable elements for letter matching
    const allEls = [...document.querySelectorAll('a, button, [tabindex], [id]')].filter(el => {
      const t = el.getAttribute && el.getAttribute('tabindex');
      if (t === '-1') return false;
      if (el.id === 'sideBarBtn' || el.id === 'navLessonTitle' || el.id === 'mainTargetDiv') return true;

      const rect = el.getBoundingClientRect();
      return el.offsetParent !== null && rect.width > 0 && rect.height > 0;
    });

    // Compose matching elements starting with pressed key
    let matchingEls = allEls.filter(el => normalizeName(el).startsWith(key));

    // Priority elements by data-keyfocus attribute and special ids
    const priorityEls = allEls.filter(el => {
      const dk = (el.getAttribute && el.getAttribute('data-keyfocus') || '').trim().toLowerCase();
      if (dk && dk === key) return true;
      if ((el.id === 'sideBarBtn' || el.id === 'navLessonTitle' || el.id === 'mainTargetDiv')
          && normalizeName(el).startsWith(key)) return true;
      return false;
    });

    if (priorityEls.length) {
      const set = new Set(priorityEls);
      matchingEls = [...priorityEls, ...matchingEls.filter(el => !set.has(el))];
    }

    if (matchingEls.length === 0) return;

    // Focus navigation among matching elements
    let iActiveAll = allEls.indexOf(active);
    if (iActiveAll === -1) iActiveAll = -1;

    if (key !== window.lastLetterPressed) {
      // NEW letter press — go forward or backward with shift key
      let target;
      if (e.shiftKey) {
        target = [...matchingEls].reverse().find(el => allEls.indexOf(el) < iActiveAll) || matchingEls[matchingEls.length - 1];
      } else {
        target = matchingEls.find(el => allEls.indexOf(el) > iActiveAll) || matchingEls[0];
      }
      target?.focus();
    } else {
      // SAME letter press — cycle through matches
      let target = null;
      for (let i = iActiveAll + 1; i < allEls.length; i++) {
        if (normalizeName(allEls[i]).startsWith(key)) {
          target = allEls[i];
          break;
        }
      }
      if (!target) {
        for (let i = 0; i < allEls.length; i++) {
          if (normalizeName(allEls[i]).startsWith(key)) {
            target = allEls[i];
            break;
          }
        }
      }
      target?.focus();
    }

    window.lastLetterPressed = key;
  });
}
