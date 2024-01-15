


/**@param {HTMLElement} child
 * @return {boolean}
 */
function tag23_start_tag(child){
    child.style.display = TAG_23_SHOW;
    return TAG_23_EXECUTE_CHILD;
}



/**@param {HTMLElement} child
 * @return {boolean}
 */
function set_value(child){
    let name_of_var = child.getAttribute(TAG_23_SET_VALUE);
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

