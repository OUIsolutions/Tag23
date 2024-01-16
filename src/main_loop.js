

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

