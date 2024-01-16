const TAG_23_START = "start";
const TAG_23_CASE = "case";
const TAG_23_UNLESS = "unless"
const TAG_23_SET_VALUE = "set_value";
const TAG_23_DEFAULT_VALUE = "default_value";
const TAG_23_PRINT = "print";
const TAG_23_EVALUATED = "evaluated"
const TAG_23_FOR = "for";
const  TAG_23_IN = "in";
const TAG_23_INDEX = "index";
const TAG_23_DESTROY = "destroy";
const TAG_23_HIDE ="none";
const  TAG_23_SHOW = 'block';

const TAG_23_TICK_DEFAULT_TIME = 40;


let TAG_23_CURRENT_TICK = 0;
let TAG_23_TIME_PASSED = 0;
/**@type {Array<function>}*/
let TAG_23_MAIN_LOOP_CALLBACKS = [];


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
            console.log(error);
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


function tag23_get_old_elements(father,index,iterator){
    let elements = [];
    for(let i = 0;i< father.children.length;i++){
        let point = i+index+1;
        let current = father.children[point];
        if(!current){
            break;
        }

        if(!current.hasAttribute(TAG_23_INDEX)){
            let name = current.getAttribute(TAG_23_IN);
            if(name !== iterator){
                break;
            }
        }


        elements.push({
            index: parseInt(current.getAttribute(TAG_23_INDEX)),
            order:i,
            element:current
        });
    }
    return elements;
}



/**@param {Tag23LoopProps} loop_props
 */
function tag23_for(loop_props){
    loop_props.skip = true;
    let current = loop_props.current_element;
    current.style.display = TAG_23_HIDE;

    let value_as = current.getAttribute(TAG_23_FOR);
    if(!value_as){
        console.log("for value not provided")
        return;
    }
    let index_name = `${value_as}_${TAG_23_INDEX}`
    let destroy_name = `${value_as}_${TAG_23_DESTROY}`
    let array_name =   current.getAttribute(TAG_23_IN);
    if(!array_name){
        console.log("in not provided")
        return;
    }
    /**@type {Array<any>}*/
    let array_value = tag23get_evaluation_result(current,array_name);
    if(!array_value){
        return;
    }
    //iterated over the brothers of child
    let father = current.parentNode;
    let elements = tag23_get_old_elements(father,loop_props.index,array_name);



    for(let j=0;j<array_value.length;j++){
        //verify if j its not present on elements
        let found = false;
        for(let k=0;k<elements.length;k++){
            if(elements[k].index === j){
                found = true;
                break;
            }
        }
        if(found){
            continue;
        }

        let created = current.cloneNode(true);
        created.style.display = TAG_23_SHOW;
        //remove attribute for
        created.removeAttribute(TAG_23_FOR);

        set_value_recursively_in_element(created,value_as,()=>{
            return array_value[j];
        })

        set_value_recursively_in_element(created,index_name,()=>{
            return j;
        })

        set_value_recursively_in_element(created,destroy_name,()=>{
            array_value.splice(j,1);
        })


        created.setAttribute(TAG_23_INDEX,j);
        elements.push({
            index:j,
            element:created
        });
    }



    //sort elements by index
    elements.sort((a,b)=>a.index-b.index);
    let its_all_correct = true;
    for(let j=0;j<elements.length;j++){
        if(elements[j].order !== j){
            its_all_correct = false;
            break;
        }
    }

    if(its_all_correct && elements.length === array_value.length){
        return;
    }

    //console.log(elements);
    //console.log(array_value);


    let fragment = document.createDocumentFragment();
    for(let j=0;j<elements.length;j++){
        //verify if j its not present on elements
        let current = elements[j];



        if(current.element.parentNode === father){
            current.element = father.removeChild(current.element);
        }
        if(current.index <= array_value.length -1){
            fragment.appendChild(current.element);
        }

    }
    father.insertBefore(fragment,current.nextSibling);



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
    current_element.setAttribute(TAG_23_EVALUATED,'true');

}

/**@param {HTMLInputElement} current_element
 */
function tag23_set_value(current_element){

    let name_of_var = current_element.getAttribute(TAG_23_SET_VALUE);

    if(document.activeElement === current_element){
        let var_type = undefined;
        try{
            //the variable cannot exist
            eval(`var_type =${name_of_var}.constructor.name`);
        }catch (error){}
        if(var_type === 'Number'){
            eval(`${name_of_var} = Number(current_element.value)`);
        }

        if(var_type !== 'Number'){
            eval(`${name_of_var} = current_element.value`);
        }

    }

    if(document.activeElement !== current_element){

        try {
            //the variable cannot exist
            let value = tag23get_evaluation_result(current_element,name_of_var);
            if(value !== undefined && value !== null){
                current_element.value = value;
            }
        }catch (error){}

    }


}

/**@param {HTMLElement} current_element
 */
function tag23_print(current_element){
    let text = current_element.getAttribute(TAG_23_PRINT);
    current_element.innerHTML = tag23get_evaluation_result(current_element,text);

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
                console.error(error);
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
    let time = TAG_23_TICK_DEFAULT_TIME;

    try{
        //maybe the user can define it
        if(TAG_23_TICk_TIME){
            time = Number(TAG_23_TICk_TIME);
        }
    }catch (error){}
        setInterval(function(){
         TAG_23_CURRENT_TICK++;
         TAG_23_TIME_PASSED+=time;

         run_loop(document.body);
    },time);
}

window.addEventListener('load',start);


