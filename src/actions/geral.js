


/**@param {HTMLElement} current_element
 */
function tag23_start(current_element){
    current_element.style.display = TAG_23_SHOW;
}


/**@param {HTMLElement || HTMLInputElement} current_element
 */
function tag23_value(current_element){

    if(current_element.getAttribute(TAG_23_SET_VALUE)){
        return;
    }
    if(current_element.getAttribute(TAG_23_EVALUATED)){
        return;
    }

    let tag_data = current_element.getAttribute(TAG_23_DEFAULT_VALUE);
    current_element.value = tag23get_evaluation_result(current_element,tag_data);
    current_element.setAttribute(TAG_23_EVALUATED,'true');

}

/**@param {HTMLInputElement} current_element
 */
function tag23_set_value(current_element){

    if(document.activeElement === current_element){
        return;
    }
    let name_of_var = current_element.getAttribute(TAG_23_SET_VALUE);

    //the variable cannot exist
    let value = tag23get_evaluation_result(current_element,name_of_var);
    if(value !== undefined && value !== null){
        current_element.value = value;
    }

}

/**@param {HTMLElement} current_element
 */
function tag23_print(current_element){
    let text = current_element.getAttribute(TAG_23_PRINT);

    let evaluation = tag23get_evaluation_result(current_element,text);
    if(evaluation){
        current_element.innerHTML = evaluation;
    }
}


