


/**@param {HTMLElement} child
 * @param {number} index
 * @return {boolean}
 */
function tag23_execute_main_loop_actions(child,index){
    /**@type {Array<boolean>}*/
    let execute_child = []
    if(child.hasAttribute(TAG_23_START)){
        execute_child.push( tag23_start_tag(child));
    }

    if(child.hasAttribute(TAG_23_CASE)){
       execute_child.push(tag23_case(child));
    }

    if(child.hasAttribute(TAG_23_UNLESS)){
        execute_child.push(tag23_unless(child));
    }

    if(child.hasAttribute(TAG_23_SET_VALUE)) {
        execute_child.push(tag23_set_value(child));
    }

    if(child.hasAttribute(TAG_23_CONTENT)){
        execute_child.push(tag23_content(child));
    }

    if(child.hasAttribute(TAG_23_FOR)){
        execute_child.push(tag23_for(child,index));
    }
    
    if(execute_child.includes(TAG_23_SKIP_CHILD)){
        return  TAG_23_SKIP_CHILD;
    }
    return TAG_23_EXECUTE_CHILD;

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
    },2000);
}

window.addEventListener('load',start);

