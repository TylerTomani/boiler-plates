// import { sideBar, sideBarBtn } from './main-script.js'; // Uncomment if 
// const sideBar = document.querySelector('.side-bar');
// const sideBarBtn = document.querySelector('#sideBarBtn');
export function togggleSidebar(mainContainer,e)  {
    console.log(mainContainer)
    // Toggle the sidebar visibility
    mainContainer?.classList.toggle('collapsed');

    // Change the icon based on the sidebar state
    // if (sideBar.classList.contains('collapsed')) {
    //     sideBarBtn.classList.remove('bx-menu');
    //     sideBarBtn.classList.add('bx-menu-alt-right');
    // } else {
    //     sideBarBtn.classList.remove('bx-menu-alt-right');
    //     sideBarBtn.classList.add('bx-menu');
    // }
}