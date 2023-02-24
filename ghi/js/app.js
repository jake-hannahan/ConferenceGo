function createCard(name, description, pictureUrl, date, locationName) {
    return `
        <div class="card shadow p-3 mb-5 bg-body rounded">
            <img src= ${pictureUrl} class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${locationName}</h6>
                <p class="card-text">${description}</p>
                <p class="card-text"><small class="text-muted">${date}</small></p>
            </div>
        </div>
    `;
}
function error(status) {
    return `
        <div class="alert alert-warning" role="alert">
            Bad response (${status}) warning alert—check it out!
        </div>
    `;
}


window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/conferences/';

    try {
        const response = await fetch(url);

        if (!response.ok) {
            let column = document.querySelector(".col");
            let html = error(response.status);
            column.innerHTML += html;
        } else {
            const data = await response.json();

            let count = 0;
            for (let conference of data.conferences) {
                const detailUrl = `http://localhost:8000${conference.href}`;
                const detailResponse = await fetch(detailUrl);
                count += 1;
                if (count > 3) {
                    count -= 3;
                }
                if (detailResponse.ok) {
                    const details = await detailResponse.json();

                    const title = details.conference.name;
                    const description = details.conference.description;
                    const pictureUrl = details.conference.location.picture_url;
                    let startDate = details.conference.starts;
                    let endDate = details.conference.ends;
                    const date = `${startDate.slice(0, 10)} - ${endDate.slice(0, 10)}`;
                    const locationName = details.conference.location.name;

                    const html = createCard(title, description, pictureUrl, date, locationName);

                    const column = document.getElementById(`col${count}`);
                    column.innerHTML += html;
                }
            }

        }
    } catch (e) {
        const column = document.querySelector(".col");
        const html = error(e.status);
        column.innerHTML += html;
    }


});
