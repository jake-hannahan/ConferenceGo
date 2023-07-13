import React, { useEffect, useState, } from 'react';

function ConferenceForm() {
    const [locations, setLocations] = useState([]);
    const [name, setName] = useState('');
    const [starts, setStarts] = useState('');
    const [ends, setEnds] = useState('');
    const [description, setDescription] = useState('');
    const [maxPresentations, setMaxPresentations] = useState('');
    const [maxAttendees, setMaxAttendees] = useState('');
    const [location, setLocation] = useState('');

    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    }

    const handleStartsChange = (event) => {
        const value = event.target.value;
        setStarts(value);
    }

    const handleEndsChange = (event) => {
        const value = event.target.value;
        setEnds(value);
    }

    const handleDescriptionChange = (event) => {
        const value = event.target.value;
        setDescription(value);
    }

    const handleMaxPresentationsChange = (event) => {
        const value = event.target.value;
        setMaxPresentations(value);
    }

    const handleMaxAttendeesChange = (event) => {
        const value = event.target.value;
        setMaxAttendees(value);
    }

    const handleLocationChange = (event) => {
        const value = event.target.value;
        setLocation(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};

        data.name = name;
        data.starts = starts;
        data.ends = ends;
        data.description = description;
        data.max_presentations = maxPresentations;
        data.max_attendees = maxAttendees;
        data.location = location;

        const conferenceUrl = 'http://localhost:8000/api/conferences/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(conferenceUrl, fetchConfig);
        if (response.ok) {
            const newConference = await response.json();

            setName('');
            setStarts('');
            setEnds('');
            setDescription('');
            setMaxPresentations('');
            setMaxAttendees('');
            setLocation('');
        }

    }

    const fetchData = async () => {
        const url = 'http://localhost:8000/api/locations/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setLocations(data.locations);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new conference</h1>
            <form onSubmit={handleSubmit} id="create-conference-form">
              <div className="form-floating mb-3">
                <input onChange={handleNameChange} placeholder="Name" required type="text" name="name" id="name" value={name} className="form-control"/>
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleStartsChange} placeholder="Start date" required type="date" name="starts" id="starts" value={starts} className="form-control"/>
                <label htmlFor="starts">Starts</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleEndsChange} placeholder="End date" required type="date" name="ends" id="ends" value={ends} className="form-control"/>
                <label htmlFor="start_date">Ends</label>
              </div>
              <div className="mb-3">
                <label htmlFor="description">Description</label>
                <textarea onChange={handleDescriptionChange} placeholder="Write the description" required type="text" name="description" id="description" value={description} className="form-control" rows="3"></textarea>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleMaxPresentationsChange} placeholder="Max presentations" required type="text" name="max_presentations" id="max_presentations" value={maxPresentations} className="form-control"/>
                <label htmlFor="max_presentations">Max presentations</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleMaxAttendeesChange} placeholder="Max attendees" required type="text" name="max_attendees" id="max_attendees" value={maxAttendees} className="form-control"/>
                <label htmlFor="max_attendees">Max attendees</label>
              </div>
              <div className="mb-3">
                <select onChange={handleLocationChange} required id="location" className="form-select" value={location} name="location">
                  <option value="">Choose a location</option>
                  {locations.map(location => {
                    return (
                        <option key={location.id} value={location.id}>
                            {location.name}
                        </option>
                    )
                  })}
                </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
        </div>
    )
};

export default ConferenceForm;
