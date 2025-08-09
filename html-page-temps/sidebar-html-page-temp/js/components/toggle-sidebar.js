
export function togggleSidebar(mainContainer,e)  {
    if(e){

        let hasLiParent = findLi(e.target);
        console.log(hasLiParent)
        if(hasLiParent){
            return
        }
    } 

        
        mainContainer?.classList.toggle('collapsed');    
    
}

function findLi(parent){
    if(parent.tagName === 'LI'){
        return true
    } else if (parent.parentElement){
        return findLi(parent.parentElement)
    } else {
        return null
    }
}