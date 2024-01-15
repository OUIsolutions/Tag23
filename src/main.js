

/**
 * @typedef {Object} Tag23LoopProps
 * @property {Element || HTMLInputElement} current_element
 * @property {number} index
 * @property {boolean} skip
 * */




/**
 * @param {Tag23LoopProps} loop_props
 */
function tag23_execute_main_loop_actions(loop_props){

    let current_element = loop_props.current_element;

    if(current_element.hasAttribute(TAG_23_START)){
       tag23_start(current_element);
    }

    if(current_element.hasAttribute(TAG_23_CASE)){
       tag23_case(loop_props);
    }


    if(current_element.hasAttribute(TAG_23_UNLESS)){
        tag23_unless(loop_props);
    }
    if(current_element.hasAttribute(TAG_23_VALUE)){
        tag23_value(current_element);
    }


    if(current_element.hasAttribute(TAG_23_SET_VALUE)) {
        tag23_set_value(current_element);
    }

    if(current_element.hasAttribute(TAG_23_CONTENT)){
        tag23_content(current_element);
    }


    if(current_element.hasAttribute(TAG_23_FOR)){
        tag23_for(loop_props);
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

        tag23_execute_main_loop_actions(loop_props);
        i = loop_props.index;
        
        if(!loop_props.skip){
            run_loop(loop_props.current_element);
        }


    }

}
function start(){
    

    run_loop(document);
    
    setInterval(function(){
        run_loop(document.body);
    },100);
}

window.addEventListener('load',start);

