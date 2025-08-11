// js/components/toggle-sidebar.js
export function togggleSidebar(mainContainer) {
  addEventListener('keydown',e => {
    let key = e.key.toLowerCase()
    if(key === 'enter'){
      if (e && e.target) {
        let node = e.target;
        while (node) {
          if (node.tagName === 'LI') return; // ignore toggling if click was inside a link list item
          node = node.parentElement;
        }
      }
      mainContainer?.classList.toggle('collapsed');
    }
  })
}
    