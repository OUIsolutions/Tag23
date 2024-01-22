
/**
 * @param {HTMLElement} current
 * @param {Array<any>} array_value
 * @param {Array<HTMLElement>} old_elements
 * @param {string} value_as
 * */
function tag23_for_array(current,array_value,old_elements,value_as) {

    let array_size = array_value.length;
    let old_elements_size = old_elements.length;


    if(old_elements_size > array_size){
        tag_23_remove_higher_elements(old_elements,array_size);
    }
    if(old_elements_size< array_size){
        tag_23_insert_clones(current,old_elements,array_size);
    }

    tag_23_create_element_methods(value_as,array_value,old_elements);

}