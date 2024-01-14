

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
        
        if(child.hasAttribute('content')){
            let text = child.getAttribute('content');
            let result = get_evaluation_result(text);
            child.innerHTML = result;
        }
        
        run_loop(child);
    }

}
function start(){

    setInterval(function(){
        run_loop(document.body);
    },100);
}


window.addEventListener('load',start);