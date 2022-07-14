import HOST from "./host";
function deleteEvent(event_id, success, error) {
    fetch(HOST? HOST + '/API/delete-event.php' : '/API/delete-event.php', { 
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({event_id: event_id})
    })
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
            success(data.event);
        }
    })
    .catch(err => {
        if(err === 'unauthenticate') {
            window.location.reload();
        } else error(err);
    })
}

export default deleteEvent;