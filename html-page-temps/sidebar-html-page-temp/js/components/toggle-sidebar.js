import { mainContainer, sideBar } from "../main-script.js";

export function togggleSidebar() {
  // Keyboard shortcut for toggling
  window.addEventListener('keydown', e => {
    if (e.key.toLowerCase() === 'enter') {
      // Ignore if focus is on a link inside the sidebar
      if (sideBar.contains(e.target) && e.target.tagName === 'A') return;
      mainContainer?.classList.toggle('collapsed');
    }
  });

  // Click on sidebar background (not a link) toggles
  sideBar.addEventListener('click', e => {
    const clickedLink = e.target.closest('.sidebar-links-ul li a');
    if (clickedLink) {
      // Let links behave normally (injectContent will handle)
      return;
    }
    mainContainer?.classList.toggle('collapsed');
  });
}
