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
                break;
            }
        }
    }
    if(loop_props.skip ){
        return;
    }


    for(let attribute of current_element.getAttributeNames()){
        
        if(!attribute.startsWith(TAG_23_EVAL)){
            continue;
        }

        // attribute starts with 'eval'
        let formated_name = attribute.substring(TAG_23_EVAL.length);
        // Get the attribute content
        let attribute_content = current_element.getAttribute(attribute);
        
        try{
            let evaluated = tag23get_evaluation_result(current_element,attribute_content);

            if(current_element.getAttribute(formated_name) !== evaluated && formated_name !== ''){
                current_element.setAttribute(formated_name,evaluated);
            }

        }

        catch (error){
            loop_props.skip = true;
            current_element.style.display = TAG_23_HIDE;
            tag23_show_error_message(error);
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