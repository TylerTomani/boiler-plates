export function togggleSidebar(e,mainContainer)  {
    if(e){
        let hasLiParent = findLi(e.target);
        if(hasLiParent){
            return
        }
    } 
    mainContainer?.classList.toggle('collapsed');       
}
function findLi(parent){
    if(parent.tagName === 'LI' || parent.tagName === 'NAV' ){
        console.log(parent)
        return true
    } else if (parent.parentElement){
        return findLi(parent.parentElement)
    } else {
        return null
    }
}