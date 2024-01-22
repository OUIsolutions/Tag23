
/**@param {Tag23LoopProps} loop_props
 * @return {Array<HTMLElement>}
 */
function tag23_get_old_elements(loop_props){
    /**@type {Array<HTMLElement || ChildNode>}*/
    let elements = [];
    let current_element = loop_props.current_element.previousSibling;
    while(current_element){
        current_element = current_element.previousSibling;
        if(!current_element){
            break;
        }

        if(current_element.element_of === loop_props.current_element){
            elements.push(current_element);
        }
    }
    return  elements;
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
    for(let i = old_elements.length; i < array_size; i++){
        let clone = current_element.cloneNode(true);
        clone.style.display = TAG_23_SHOW;
        clone.removeAttribute('for');
        clone.element_of = current_element;
        let father  = current_element.parentElement;
        father.insertBefore(clone,current_element);
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
        console.log("for value not provided")
        return;
    }
    let array_name =   current.getAttribute(TAG_23_IN);
    if(!array_name){
        console.log("in not provided")
        return;
    }
    /**@type {Array<any>}*/
    let array_value = tag23get_evaluation_result(current,array_name);

    let old_elements = tag23_get_old_elements(loop_props);
    if(old_elements.length > array_value.length){
        tag_23_remove_higher_elements(old_elements,array_value.length);
    }
    if(old_elements.length < array_value.length){
        tag_23_insert_clones(current,old_elements,array_value.length);
    }

}


