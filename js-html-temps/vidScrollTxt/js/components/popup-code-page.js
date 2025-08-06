
addEventListener('DOMContentLoaded', e => {
    const popupCodePage = document.querySelector('#popupCodePage');
    const toggleCodePage =  (e) =>{
        const key = e.key.toLowerCase();    
        if(e.shiftKey && key === 'p'){
            console.log(popupCodePage)
            popupCodePage.classList.toggle('active')
        }
    }
    window.addEventListener('keydown', toggleCodePage)
});


