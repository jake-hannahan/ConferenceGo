window.addEventListener('DOMContentLoaded', async () => {

    const conferenceUrl = 'http://localhost:8000/api/conferences/';

    const conferenceResponse = await fetch(conferenceUrl);
    if (conferenceResponse.ok) {
        const data = await conferenceResponse.json();

        const conferenceSelect = document.getElementById("conference");
        for (const conference of data.conferences) {
            const option = document.createElement('option');
            option.value = conference.href; // .replace(/\D/g,'')

            option.innerHTML = conference.name;

            conferenceSelect.appendChild(option);
        }
    }


    const formTag = document.getElementById('create-presentation-form');

    formTag.addEventListener('submit', async event => {
        event.preventDefault();
        const formData = new FormData(formTag);
        const json = JSON.stringify(Object.fromEntries(formData));
        const obj = JSON.parse(json);
        let href = obj.conference;
        delete obj.conference;
        const newJson = JSON.stringify(obj);

        const presentationUrl = `http://localhost:8000${href}presentations/`;
        const fetchConfig = {
            method: "post",
            body: newJson,
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(presentationUrl, fetchConfig);
        if (response.ok) {
            formTag.reset();
            const newPresentation = await response.json();
        }
    })
});
