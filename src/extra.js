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