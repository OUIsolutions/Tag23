/**
 * @param {string} value_as
 @param {Object} object_value
 * @param {Array<HTMLElement>} elements
 */
function  tag_23_create_element_methods_objects(value_as,object_value,elements){

    let i = 0;

    for(let key in object_value){
        let current_element = elements[i];
        i+=1;

        function  get_element(){
            return object_value[key]
        }
        set_value_recursively_in_element(current_element,value_as,get_element);


        let key_name =  `${value_as}_${TAG_23_KEY}`;
        function  get_key(){
            return key;
        }

        set_value_recursively_in_element(current_element,key_name,get_key);

        let destroy_name =  `${value_as}_${TAG_23_DESTROY}`;
        function  destroy(){
            delete  object_value[key];
        }
        set_value_recursively_in_element(current_element,destroy_name,destroy);
    }
}

/**
 * @param {HTMLElement} current
 * @param {Object} object_value
 * @param {Array<HTMLElement>} old_elements
 * @param {string} value_as
 * */
function tag23_for_object(current,object_value,old_elements,value_as) {


    let object_size = Object.keys(object_value).length;
    let old_elements_size = old_elements.length;


    if(old_elements_size > object_size){
        tag_23_remove_higher_elements(old_elements,object_size);
    }
    if(old_elements_size< object_size){
        tag_23_insert_clones(current,old_elements,object_size);
    }

    tag_23_create_element_methods_objects(value_as,object_value,old_elements);

}