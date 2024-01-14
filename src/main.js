

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
            let itens_var =   child.getAttribute('in');
            let rendered_itens = get_evaluation_result(itens_var);
            //iterated over the brothers of child
            
            let elements = [];


            for(j = 0;j<target.children.length;j++){
                let point = j+i+1;
                let current = target.children[point];
                if(!current){
                    break;
                }

                if(!current.hasAttribute('index')){
                    break;
                }
                elements.push({
                    index:current.getAttribute('index'),
                    order:j,
                    element:current
                });

            }

            for(let j=0;j<rendered_itens.length;j++){
                //verify if j its not present on elements
                let found = false;
                for(let k=0;k<elements.length;k++){
                    if(elements[k].index == j){
                        found = true;
                        break;
                    }
                }
                if(found){
                    continue;
                }
                
                let current = child.cloneNode(true);
                current.style.display = 'block';
                //remove attribute for 
                current.removeAttribute('for');
                current.setAttribute('index',j);
                elements.push({
                    index:j,
                    element:current
                });
            }
            
            //sort elements by index
            elements.sort((a,b)=>a.index-b.index);
            let its_all_correct = true;
            for(let j=0;j<elements.length;j++){
                if(elements[j].order != j){
                    its_all_correct = false;
                    break;
                }
            }
            if(its_all_correct){
                continue;
            }


            let fragment = document.createDocumentFragment();
            for(let j=0;j<elements.length;j++){
                //verify if j its not present on elements
                let current = elements[j];

                if(current.element.parentNode === target){
                     let removed = target.removeChild(current.element);
                     current.element = removed;
                }
                fragment.appendChild(current.element);
            }
            target.insertBefore(fragment,child.nextSibling);

            continue;
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