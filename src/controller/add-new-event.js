import HOST from "./host";

function addNewEventToDb(eventData, success, error) {
    fetch(HOST? HOST + '/API/add-event.php' : '/API/add-event.php', { 
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData)
    })
    .then(response => {
        console.log(response)
        if(response.ok) {
            return response.json();
        } else {
            throw `Error Occured: Status ${response.status}`;
        }
    })
    .then(data => {
        if(data.error) {
            throw data.error;
        } else {
            success(data);
        }
    })
    .catch(err => {
        if(err === 'unauthenticate') {
            window.location.reload();
        } else error(err);
    })
}

export default addNewEventToDb;