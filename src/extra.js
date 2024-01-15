/**
 * @param {function || string } text
 * @return {string  || any}
 * */
function tag23get_evaluation_result(text){
    let callback = ()=>eval(text);
    while (callback instanceof Function) {
        callback = callback();
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