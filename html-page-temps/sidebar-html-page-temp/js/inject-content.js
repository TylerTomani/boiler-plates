document.getElementById("sideBarBtn").addEventListener("click", (e) => {
  e.preventDefault()
  toggleSidebar()
});
document.getElementById("sideBarBtn").addEventListener("keydown", (e) => {
    let key = e.key.toLowerCase()
    if(key === 'enter'){
      toggleSidebar()
    }
});
function toggleSidebar() {
  const mainContainer = document.querySelector('main.main-container');
  mainContainer.classList.toggle('collapsed');
}


