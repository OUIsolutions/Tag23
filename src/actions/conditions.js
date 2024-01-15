/**@param {HTMLElement} child
 * @return {boolean}
 * */
function tag23_case(child){
    let condition = child.getAttribute(TAG_23_CASE);
    let result = tag23get_evaluation_result(condition);

    if(result){
        child.style.display = TAG_23_SHOW;
        return TAG_23_EXECUTE_CHILD;
    }
    if(!result){
        child.style.display = TAG_23_HIDE;
        return TAG_23_SKIP_CHILD;
    }


}
/**@param {HTMLElement} child
 * @return {boolean}
 * */
function tag23_unless(child){
    let condition = child.getAttribute(TAG_23_UNLESS);
    let result = tag23get_evaluation_result(condition);

    if(result){
        child.style.display = TAG_23_HIDE;
        return TAG_23_SKIP_CHILD;
    }

    if(!result){
        child.style.display = TAG_23_SHOW;
        return TAG_23_EXECUTE_CHILD;
    }



}
