


/**@param {HTMLElement} child
 * @return {boolean}
 */
function tag23_start_tag(child){
    child.style.display = TAG_23_SHOW;
    return TAG_23_EXECUTE_CHILD;
}

/**@param {HTMLElement} child
 * @return {boolean}
 * */
function tag23_case(child){
    let condition = child.getAttribute(TAG_23_CASE);
    let result = tag23get_evaluation_result(condition);

    if(result){
        child.style.display = TAG_23_SHOW;
    }
    if(!result){
        child.style.display = TAG_23_HIDE;
        return TAG_23_SKIP_CHILD;
    }

    return TAG_23_EXECUTE_CHILD;
}


/**@param {HTMLElement} child
 * @return {boolean}
 */
function tag23_create_var(child){
    let name_of_var = child.getAttribute(TAG_23_CREATE_VAR);
    let code = `${name_of_var} = child.value;`
    eval(code);
    return TAG_23_EXECUTE_CHILD;

}


/**@param {HTMLElement} child
 * @return {boolean}
 */
function tag23_content(child){
    let text = child.getAttribute(TAG_23_CONTENT);
    child.innerHTML = tag23get_evaluation_result(text);
    return TAG_23_EXECUTE_CHILD;
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

    let elements = [];
    let father = child.parentNode;

    for(let j = 0;j< father.children.length;j++){
        let point = j+index+1;
        let current = father.children[point];
        if(!current){
            break;
        }

        if(!current.hasAttribute('index')){
            break;
        }
        elements.push({
            index:current.getAttribute('index'),
            order:j,
            element:current
        });

    }

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
    parent.insertBefore(fragment,child.nextSibling);

    return  TAG_23_SKIP_CHILD;

}