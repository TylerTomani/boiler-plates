// import { mainTargetDiv } from "./main-script";
export const mainTargetDiv = document.querySelector('#mainTargetDiv');
export function injectContent(href) {
    fetch(href)
        .then(response => response.text())
        .then(html => {
            mainTargetDiv.innerHTML = html;
            // addCopyCodes();
            // letterFocus();
            // stepTxtsFocus();
            // loadTutorialCurrentTime()
        })
        .catch(err => {
            console.error('Failed to load content:', err);
        });
}

// document.getElementById("sideBarBtn").addEventListener("click", (e) => {
//   e.preventDefault()
//   toggleSidebar()
// });
// document.getElementById("sideBarBtn").addEventListener("keydown", (e) => {
//     let key = e.key.toLowerCase()
//     if(key === 'enter'){
//       toggleSidebar()
//     }
// });
// function toggleSidebar() {
//   const mainContainer = document.querySelector('main.main-container');
//   mainContainer.classList.toggle('collapsed');
// }


