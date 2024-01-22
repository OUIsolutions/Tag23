
/**@param {HTMLElement} element
 * @return {Array<HTMLElement>}
 */
function tag23_get_old_elements(element){
    let father = element.parentElement;
    /**@type {Array<HTMLElement || ChildNode>}*/
    let filtered = [];
    father.childNodes.forEach(v =>{
        if(v.element_of === element){
            filtered.push(v);
        }
    })
    return  filtered;
}

/**
 * @param {Array<HTMLElement>} old_elements
 * @param {number} array_size
 */
function  tag_23_remove_higher_elements(old_elements,array_size){
    for(let i = array_size; i < old_elements.length; i++){
        old_elements[i].remove();
    }
}
/**
 * @param {HTMLElement} current_element
 * @param {Array<HTMLElement>} old_elements
 * @param {number} array_size
 */
function tag_23_insert_clones(current_element,old_elements,array_size){
    let total_to_insert = (array_size - old_elements.length);
    let father  = current_element.parentElement;

    let last  = current_element;

    if(old_elements.length >0){
        last = old_elements[old_elements.length-1];
    }

    for(let i = 0; i < total_to_insert; i++){
        let clone = current_element.cloneNode(true);

        clone.style.display = TAG_23_SHOW;
        clone.removeAttribute(TAG_23_FOR);
        clone.removeAttribute(TAG_23_IN);
        clone.element_of = current_element;
        let next = last.nextSibling;
        father.insertBefore(clone,next);
        old_elements.push(clone);
        last = clone;
    }
}



/**@param {Tag23LoopProps} loop_props
 */
function tag23_for(loop_props){

    loop_props.skip = true;
    let current = loop_props.current_element;
    current.style.display = TAG_23_HIDE;

    let value_as = current.getAttribute(TAG_23_FOR);
    if(!value_as){
        console.log(TAG_23_FOR_NOT_PROVIDED,current)
        return;
    }
    let array_name =   current.getAttribute(TAG_23_IN);
    if(!array_name){
        console.log(TAG_23_IN_NOT_PRIVODE,current)
        return;
    }
    /**@type {Array<any>}*/
    let array_value = tag23get_evaluation_result(current,array_name);
    let old_elements = tag23_get_old_elements(current);

    if(array_value.constructor.name === TAG_23_ARRAY){
        tag23_for_array(current,array_value,old_elements,value_as);
    }
    if (array_value.constructor.name === TAG_23_OBJECT){
        tag23_for_object(current,array_value,old_elements,value_as);
    }



}


