
function tag23evaluate_iterator(current_element){
    let iterator = current_element.getAttribute(TAG_23_EVALUATE_ITERATOR);
    let in_element = current_element.getAttribute(TAG_23_IN);
    let index = current_element.getAttribute(TAG_23_INDEX);
    eval(`${iterator} = ${in_element}[index] `);
}