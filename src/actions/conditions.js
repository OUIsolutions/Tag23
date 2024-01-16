/**@param {Tag23LoopProps} loop_props
 * */
function tag23_case(loop_props){

    let current_element = loop_props.current_element;

    let condition = current_element.getAttribute(TAG_23_CASE);
    let result = tag23get_evaluation_result(current_element,condition);

    if(result){
        current_element.style.display = TAG_23_SHOW;
    }
    if(!result){
        current_element.style.display = TAG_23_HIDE;
        loop_props.skip = true;
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
