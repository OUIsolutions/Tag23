

/**
 * @param {HTMLElement} element
 * */
function tag23_remove_case_evaluation(element){
    let next = element.previousElementSibling;
    if(next.element_of === element){
        next.remove();
    }
}
/**
 * @param {HTMLElement} father
 * @param {HTMLElement} element
 * */
function tag23_add_case_evaluation_iff_not_exist(father,element){

    let next = element.previousElementSibling;

    if(next.element_of === element){
        return;
    }

    let clone = element.cloneNode(true);
    clone.removeAttribute(TAG_23_CASE);
    clone.element_of = element;
    clone.style.display = TAG_23_SHOW;
    father.insertBefore(clone,element)
}

/**
 * @param {Tag23LoopProps} loop_props
 * */
function tag23_case(loop_props){

    let current_element = loop_props.current_element;
    current_element.style.display = TAG_23_HIDE;
    let condition = current_element.getAttribute(TAG_23_CASE);


    let result = tag23get_evaluation_result(current_element,condition);

    if(result){
        tag23_add_case_evaluation_iff_not_exist(current_element.parentElement,current_element)
    }

    if(!result){
        tag23_remove_case_evaluation(current_element);
    }


}

/**@param {Tag23LoopProps} loop_props
 * */
function tag23_unless(loop_props){
    let current_element = loop_props.current_element;

    let condition = current_element.getAttribute(TAG_23_UNLESS);
    let result = tag23get_evaluation_result(current_element,condition);

    if(result){
        current_element.style.display = TAG_23_HIDE;
        loop_props.skip = true;
    }

    if(!result){
        current_element.style.display = TAG_23_SHOW;
    }



}
