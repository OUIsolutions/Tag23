


/**@param {HTMLElement} current_element
 */
function tag23_start_tag(current_element){
    current_element.style.display = TAG_23_SHOW;
}



/**@param {HTMLElement} current_element
 */
function tag23_set_value(current_element){
    let name_of_var = current_element.getAttribute(TAG_23_SET_VALUE);
    let code = `${name_of_var} = current_element.value;`
    eval(code);
}


/**@param {HTMLElement} current_element
 */
function tag23_content(current_element){
    let text = current_element.getAttribute(TAG_23_CONTENT);
    current_element.innerHTML = tag23get_evaluation_result(text);
}

