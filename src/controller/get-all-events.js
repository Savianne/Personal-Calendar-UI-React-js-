import HOST from "./host";
function getAllEvents(success, error) {
    fetch(HOST? HOST + '/API/get-all-events.php' : '/API/get-all-events.php', {method: 'POST'})
    .then(response => {
        if(!response.ok) {
            throw `Error Occured: Status ${response.status}`
        }
        return response.json();
    })
    .then(data => {
        if(data.error) {
            throw data.error;
        } else {
            success(data.events);
        }
    })
    .catch(err => {
        if(err === 'unauthenticate') {
            window.location.reload();
        } else error(err);
    })
}

export default getAllEvents;