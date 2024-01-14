



function run_loop(target){

    //iterate over all childs 

    for(let i=0;i<target.children.length;i++){
        let child = target.children[i];
        console.log(child);
        run_loop(child);
    }

}
function start(){

    setInterval(function(){
        run_loop(document.body);
    },100);
}


window.addEventListener('load',start);