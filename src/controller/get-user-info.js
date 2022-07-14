import HOST from "./host";
function getUserInfo(success, error) {
    fetch(HOST? HOST + '/GoogleOauth2Client/user-info.php' : '/GoogleOauth2Client/user-info.php', {method: 'POST'})
    .then(response => {
        if(!response.ok) {
            throw `Error Occured: Status ${response.status}`
        }
        return response.json();
        
    })
    .then(data => {
        if(data.error) {
            throw data.error;
        }

        success(data.user_info);
    })
    .catch(err => {
        if(err === 'unauthenticate') error(err);
    })
}

export default getUserInfo;