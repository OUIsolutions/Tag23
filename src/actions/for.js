
function tag23_get_old_elements(father,index){
    let elements = [];
    for(let i = 0;i< father.children.length;i++){
        let point = i+index+1;
        let current = father.children[point];
        if(!current){
            break;
        }

        if(!current.hasAttribute(TAG_23_INDEX)){
            break;
        }

        elements.push({
            index: parseInt(current.getAttribute(TAG_23_INDEX)),
            order:i,
            element:current
        });
    }
    return elements;
}

/**@param {HTMLElement} child
 * @param {number} index
 * @return {boolean}
 */
function tag23_for(child,index){
    child.style.display = TAG_23_HIDE;
    let name_of_var = child.getAttribute(TAG_23_FOR);
    let tens_of_var =   child.getAttribute(TAG_23_IN);
    let rendered_tens = tag23get_evaluation_result(tens_of_var);
    //iterated over the brothers of child
    let father = child.parentNode;
    let elements = tag23_get_old_elements(father,index);

    for(let j=0;j<rendered_tens.length;j++){
        //verify if j its not present on elements
        let found = false;
        for(let k=0;k<elements.length;k++){
            if(elements[k].index === j){
                found = true;
                break;
            }
        }
        if(found){
            continue;
        }

        let current = child.cloneNode(true);
        current.style.display = TAG_23_SHOW;
        //remove attribute for
        current.removeAttribute('for');
        current.setAttribute('index',j);
        elements.push({
            index:j,
            element:current
        });
    }

    //sort elements by index
    elements.sort((a,b)=>a.index-b.index);
    let its_all_correct = true;
    for(let j=0;j<elements.length;j++){
        if(elements[j].order !== j){
            its_all_correct = false;
            break;
        }
    }
    if(its_all_correct){
        return  TAG_23_SKIP_CHILD;
    }


    let fragment = document.createDocumentFragment();
    for(let j=0;j<elements.length;j++){
        //verify if j its not present on elements
        let current = elements[j];

        if(current.element.parentNode === parent){
            current.element = parent.removeChild(current.element);
        }

        fragment.appendChild(current.element);
    }
    father.insertBefore(fragment,child.nextSibling);


    return  TAG_23_SKIP_CHILD;

}