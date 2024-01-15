/**
 * @param {function || string } text
 * @return {string  || any}
 * */
function tag23get_evaluation_result(text){
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
