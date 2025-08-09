export function togggleSidebar(e,mainContainer)  {
    if(e){
        console.log(e.target)
        let hasLiParent = findLi(e.target);
        if(hasLiParent){
            return
        }
    } 
    mainContainer?.classList.toggle('collapsed');       
}
function findLi(parent){
    if(parent.tagName === 'LI'){
        console.log(parent)
        return true
    } else if (parent.parentElement){
        return findLi(parent.parentElement)
    } else {
        return null
    }
}