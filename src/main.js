

function get_evaluation_result(text){
    function callback(){
        return eval(text);
    }

    try{
        return callback();

    }catch(e){
        console.log(e);
    }
}

function run_loop(target){

    //iterate over all childs 

    for(let i=0;i<target.children.length;i++){
        let child = target.children[i];
        //check if child has attribute content 
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