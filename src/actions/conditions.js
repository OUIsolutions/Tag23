

/**
 * @param {HTMLElement} element
 * */
function tag23_set_case_evaluation_as_trash(element){
    let previews = element.previousElementSibling;
    if(!previews){
        return;
    }
    if(previews.element_of === element){
        previews.trash = true
        previews.style.display =  TAG_23_HIDE;
    }
}
/**
 * @param {HTMLElement} father
 * @param {HTMLElement} element
 * */
function tag23_add_case_evaluation_iff_not_exist(father,element){

    let previews = element.previousElementSibling;

    if(previews){
        if(previews.element_of === element &&  !previews.trash){
            return;
        }

    }

    let clone = element.cloneNode(true);
    clone.removeAttribute(TAG_23_CASE);
    clone.element_of = element;
    clone.style.display = TAG_23_SHOW;


    father.insertBefore(clone,element)
    //these prevent  trash acumulation
    if(previews){
        if(previews.element_of === element &&  previews.trash){
            previews.remove();
        }
    }

}

/**
 * @param {Tag23LoopProps} loop_props
 * */
function tag23_case(loop_props){
    loop_props.skip = true;
    let current_element = loop_props.current_element;
    current_element.style.display = TAG_23_HIDE;
    let condition = current_element.getAttribute(TAG_23_CASE);


    let result = tag23get_evaluation_result(current_element,condition);

    if(result){
        tag23_add_case_evaluation_iff_not_exist(current_element.parentElement,current_element)
    }

    if(!result){
        tag23_set_case_evaluation_as_trash(current_element);
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
