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