const TAG_23_CASE = "case";
const TAG_23_UNLESS = "unless"
const TAG_23_SET_VALUE = "set_value";
const TAG_23_DEFAULT_VALUE = "default_value";
const TAG_23_PRINT = "print";
const TAG_23_EVALUATED = "evaluated"
const TAG_23_FOR = "for";
const  TAG_23_IN = "in";
const TAG_23_INDEX = "index";
const  TAG_23_KEY = "key"
const TAG_23_DESTROY = "destroy";
const TAG_23_HIDE ="none";
const  TAG_23_SHOW = "block";
const TAG_23_OBJECT ="Object";
const TAG_23_ARRAY ="Array";
const  TAG_23_TRUE = "true";
const TAG_23_FOR_NOT_PROVIDED = "for value not provided";
const TAG_23_IN_NOT_PRIVODE = "in not provided";
const  TAG_23_LOAD = "load";
const TAG_23_START = "Tag23Start";


let TAG_23_CURRENT_TICK = 0;
let TAG_23_TIME_PASSED = 0;
/**@type {Array<function>}*/
let TAG_23_MAIN_LOOP_CALLBACKS = [];

let TAG_23_TICK_TIME = 40;
/**@type {Array<string>}*/
let TAG_23_SHOWED_MESSAGES = [];


/**
 * @param {function} callback
 * */
function tag23_main_loop(callback){
    TAG_23_MAIN_LOOP_CALLBACKS.push(callback);
}

function tag23_execute_users_main_loop(callback){
    TAG_23_MAIN_LOOP_CALLBACKS.forEach(callback =>{
        try{
            callback();
        }catch (error){
            tag23_show_error_message(error);
        }
    })
}


/**
 * @param {HTMLElement} element
 * @param {function || string } text
 * @return {string  || any}
 * */
function tag23get_evaluation_result(element,text){

    let callback = function(){return eval(text)};
    while (callback instanceof Function) {

        callback = callback.call(element);
        
    }
    return callback;


}
/**
 * @param {HTMLElement} target
 * @param {string} name
 * @param {any} value
 * */
function set_value_recursively_in_element(target,name,value){
    for(let i=0;i<target.children.length;i++) {
        let child = target.children[i];
        child[name] = value;
        set_value_recursively_in_element(child,name,value);
    }

}

/**@param {Error} error*/
function  tag23_show_error_message(error){
    let formatted = String(error);


    if(TAG_23_SHOWED_MESSAGES.includes(formatted)){
       return;
    }
    TAG_23_SHOWED_MESSAGES.push(String(formatted));
    console.log(error);
}
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


/**@param {HTMLElement} element
 * @return {Array<HTMLElement>}
 */
function tag23_get_old_elements(element){
    let father = element.parentElement;
    /**@type {Array<HTMLElement || ChildNode>}*/
    let filtered = [];
    father.childNodes.forEach(v =>{
        if(v.element_of === element){
            filtered.push(v);
        }
    })
    return  filtered;
}

/**
 * @param {Array<HTMLElement>} old_elements
 * @param {number} array_size
 */
function  tag_23_remove_higher_elements(old_elements,array_size){
    for(let i = array_size; i < old_elements.length; i++){
        old_elements[i].remove();
    }
}
/**
 * @param {HTMLElement} current_element
 * @param {Array<HTMLElement>} old_elements
 * @param {number} array_size
 */
function tag_23_insert_clones(current_element,old_elements,array_size){
    let total_to_insert = (array_size - old_elements.length);
    let father  = current_element.parentElement;

    let last  = current_element;

    if(old_elements.length >0){
        last = old_elements[old_elements.length-1];
    }

    for(let i = 0; i < total_to_insert; i++){
        let clone = current_element.cloneNode(true);

        clone.style.display = TAG_23_SHOW;
        clone.removeAttribute(TAG_23_FOR);
        clone.removeAttribute(TAG_23_IN);
        clone.element_of = current_element;
        let next = last.nextSibling;
        father.insertBefore(clone,next);
        old_elements.push(clone);
        last = clone;
    }
}



/**@param {Tag23LoopProps} loop_props
 */
function tag23_for(loop_props){

    loop_props.skip = true;
    let current = loop_props.current_element;
    current.style.display = TAG_23_HIDE;

    let value_as = current.getAttribute(TAG_23_FOR);
    if(!value_as){
        console.log(TAG_23_FOR_NOT_PROVIDED,current)
        return;
    }
    let array_name =   current.getAttribute(TAG_23_IN);
    if(!array_name){
        console.log(TAG_23_IN_NOT_PRIVODE,current)
        return;
    }
    /**@type {Array<any>}*/
    let array_value = tag23get_evaluation_result(current,array_name);
    let old_elements = tag23_get_old_elements(current);

    if(array_value.constructor.name === TAG_23_ARRAY){
        tag23_for_array(current,array_value,old_elements,value_as);
    }
    if (array_value.constructor.name === TAG_23_OBJECT){
        tag23_for_object(current,array_value,old_elements,value_as);
    }



}



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
    current_element.setAttribute(TAG_23_EVALUATED,TAG_23_TRUE);

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
    if(evaluation !== undefined && evaluation !== null){
        current_element.innerHTML = evaluation;
    }
}





/**
 * @typedef {Object} Tag23LoopProps
 * @property {Element || HTMLInputElement} current_element
 * @property {number} index
 * @property {boolean} skip
 * */




/**
 * @param {Tag23LoopProps} loop_props
 */
function tag23_execute_internal_main_loop_actions(loop_props){

    tag23_execute_users_main_loop();

    let current_element = loop_props.current_element;

    let callbacks = {
        [TAG_23_START]:()=> tag23_start(current_element),
        [TAG_23_CASE]:()=> tag23_case(loop_props),
        [TAG_23_UNLESS]:()=> tag23_unless(loop_props),
        [TAG_23_DEFAULT_VALUE]:()=> tag23_value(current_element),
        [TAG_23_SET_VALUE]:()=> tag23_set_value(current_element),
        [TAG_23_PRINT]:()=> tag23_print(current_element),
        [TAG_23_FOR]:()=> tag23_for(loop_props)
    }

    for(let attribute in callbacks){
        if(current_element.hasAttribute(attribute)){

            try{
                callbacks[attribute]();
            }

            catch (error){
                loop_props.skip = true;
                current_element.style.display = TAG_23_HIDE;
                tag23_show_error_message(error);
            }
        }
    }

    
}

/**
 * @param {HTMLElement || Document} target
 * */
function tag23run_loop(target){


    for(let i=0;i<target.children.length;i++){

        /**@type {Tag23LoopProps}*/
        let loop_props = {
            current_element: target.children[i],
            index:i,
            skip:false
        }
        tag23_execute_internal_main_loop_actions(loop_props);
        i = loop_props.index;
        
        if(!loop_props.skip){
            tag23run_loop(loop_props.current_element);
        }


    }

}
function start(){

    tag23run_loop(document);


    setInterval(function(){
         TAG_23_CURRENT_TICK+=1;
         TAG_23_TIME_PASSED+=TAG_23_TICK_TIME;

         tag23run_loop(document.body);
    },TAG_23_TICK_TIME);

}

window.addEventListener(TAG_23_LOAD,start);


