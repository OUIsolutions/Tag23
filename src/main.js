

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
function run_loop(target){


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
            run_loop(loop_props.current_element);
        }


    }

}
function start(){

    run_loop(document);

    setInterval(function(){
         TAG_23_CURRENT_TICK+=1;
         TAG_23_TIME_PASSED+=TAG_23_TICK_TIME;

         run_loop(document.body);
    },TAG_23_TICK_TIME);
}

window.addEventListener(TAG_23_LOAD,start);

