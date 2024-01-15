

/**@param {HTMLElement} child
 * @param {number} index
 * @return {boolean}
 */
function tag23_execute_main_loop_actions(child,index){


    if(child.hasAttribute(TAG_23_START)){
       return  tag23_start_tag(child);
    }

    if(child.hasAttribute(TAG_23_CASE)){
       return  tag23_case(child);
    }


    if(child.hasAttribute(TAG_23_CREATE_VAR)) {
        return  tag23_create_var(child);
    }

    if(child.hasAttribute(TAG_23_CONTENT)){
       return  tag23_content(child);
    }

    if(child.hasAttribute(TAG_23_FOR)){
        return  tag23_for(child,index);
    }


}
function run_loop(target){

    //iterate over all childs 

    for(let i=0;i<target.children.length;i++){
        let child = target.children[i];
        let execute_child = tag23_execute_main_loop_actions(child,i);

        if(execute_child){
            run_loop(child);
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

