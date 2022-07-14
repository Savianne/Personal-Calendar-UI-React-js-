import HOST from "./host";

function getAuthUrl(success, error) {
    fetch(HOST? HOST + '/GoogleOauth2Client/auth-url.php' : '/GoogleOauth2Client/auth-url.php', {method: 'POST'})
    .then(response => {
        if(response.ok) {
            return response.json()
        }
    })
    .then(data => {
        success(data.auth_url)
    })
    .catch(err => {
       error(err);
    });
}

export default getAuthUrl;