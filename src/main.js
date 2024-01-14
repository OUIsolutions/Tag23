

function get_evaluation_result(text){
    let callback = ()=>eval(text);

    try{
        while (callback instanceof Function){
            callback = callback();
        }
        return callback;

        
    }catch(e){
        console.log(e);
    }
}

function run_loop(target){

    //iterate over all childs 

    for(let i=0;i<target.children.length;i++){
        let child = target.children[i];

        if(child.hasAttribute("start")){
            child.style.display = "block";
        }

        if(child.hasAttribute('case')){
            let condition = child.getAttribute('case');
            let result = get_evaluation_result(condition);
            
            if(result){
                child.style.display = 'block';
            }
            if(!result){
                child.style.display = 'none';
                continue;
            }

        }        
        if(child.hasAttribute('create_var')) {
            let varname = child.getAttribute('create_var');
            let code = `${varname} = child.value;`
             eval(code);
        }
        if(child.hasAttribute('content')){
            let text = child.getAttribute('content');
            let result = get_evaluation_result(text);
            child.innerHTML = result;
        }
        
        if(child.hasAttribute('for')){
            child.style.display = 'none';
            let varname = child.getAttribute('for');
            let itens =   child.getAttribute('in');
            let rendered_itens = get_evaluation_result(itens);
            //iterated over the brothers of child
            let ordered = [];
            let j = 0;
            for(;j<target.children.length;j++){
                let current = target.children[i+1+j];
                if(!current){
                    break;
                }
                if(!current.hasAttribute('index')){
                    break;
                }
                let index = current.getAttribute('index');
                ordered.push({index:parseInt(index), order:j, element:current});
            }
        

            //iterate over the itens and insert the elements that 
            for(let j=0;j<rendered_itens.length;j++){
            
                //verify if there is an index with the same value as j
                let found = false;
                for(let k=0;k<ordered.length;k++){
                    if(ordered[k].index === j){
                        found = true;
                        break;
                    }
                }
                if(found){
                    continue;
                }
                let element = child.cloneNode(true);
                ordered.push({index:j,element:element});
            }
          
            //iterate over ordered and removes any index that its higher than the length of the array
            let new_ordered = [];
            for(let j=0;j<ordered.length;j++){
                if(ordered[j].index < rendered_itens.length){
                    new_ordered.push(ordered[j]);
                }
                if(ordered[j].index >= rendered_itens.length){
                    ordered[j].element.remove();
                }
            }
            //sort the array by index
            new_ordered.sort((a,b)=>a.index-b.index);
            //insert the 0 index element after the child
            let first = new_ordered[0];
            
            if(!first){
                continue;
            }
            let last_element = first.element;

            if(first.order !== first.index){
                target.insertBefore(first.element,child.nextSibling);
            }

            for(let j=1;j<new_ordered.length;j++){
                let current = new_ordered[j];
                if(current.order !== current.index){
                    target.removeChild(current.element);
                    target.insertBefore(current.element,last_element.nextSibling);
                }
                last_element = current.element;
            }
        
        }
        run_loop(child);
    }

}
function start(){

    run_loop(document.body);
    
    setInterval(function(){
        run_loop(document.body);
    },2000);
}

window.addEventListener('load',start);