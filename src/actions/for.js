
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
        clone.setAttribute("i",i);
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

/**
 * @param {string} value_as
 @param {Array<any>} array_value
 * @param {Array<HTMLElement>} elements
 */
function  tag_23_create_element_methods(value_as,array_value,elements){

    for(let i = 0; i < array_value.length;i++){
        let current_element = elements[i];

        function  get_element(){
            return array_value[i]
        }
        set_value_recursively_in_element(current_element,value_as,get_element);


        let index_name =  `${value_as}_${TAG_23_INDEX}`;
        function  get_index(){
            return i;
        }
        set_value_recursively_in_element(current_element,index_name,get_index);

        let destroy_name =  `${value_as}_${TAG_23_DESTROY}`;
        function  destroy(){
            array_value.splice(i,1);
        }
        set_value_recursively_in_element(current_element,destroy_name,destroy);
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

    let old_elements = tag23_get_old_elements(current);

    ///console.log(old_elements);

    if(old_elements.length > array_value.length){
        tag_23_remove_higher_elements(old_elements,array_value.length);
    }
    if(old_elements.length < array_value.length){
        tag_23_insert_clones(current,old_elements,array_value.length);
    }

    tag_23_create_element_methods(value_as,array_value,old_elements);




}


