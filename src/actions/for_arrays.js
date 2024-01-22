/**
 * @param {string} value_as
 @param {Array<any>} array_value
 * @param {Array<HTMLElement>} elements
 */
function  tag_23_create_element_methods_array(value_as,array_value,elements){

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

    tag_23_create_element_methods_array(value_as,array_value,old_elements);

}