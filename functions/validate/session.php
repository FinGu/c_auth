<?php
namespace api\validation;

use responses;

function validate_session(array $session_data, bool $check_logged_in = false){
    if(time() > $session_data['c_expires'])
        return responses::session_expired;

    if($check_logged_in && !$session_data['c_logged_in'])
        return responses::not_valid_session; //not the *EXACT* message but serves it's purpose
    
    return responses::success;
}
