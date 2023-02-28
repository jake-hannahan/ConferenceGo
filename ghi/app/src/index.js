import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Conference from './ConferenceList';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <Conference />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

async function loadAttendees() {
  const response = await fetch('http://localhost:8001/api/attendees/');

  if (response.ok) {
    const data = await response.json();
    console.log(data);
    root.render(
      <React.StrictMode>
        <App attendees={data.attendees} />
      </React.StrictMode>
    );
  } else {
    console.error(response);
  }
};

loadAttendees();

// async function loadConferences() {
//   const conferenceResponse = await fetch('http://localhost:8000/api/conferences/');

//   if (conferenceResponse.ok) {
//     const conferenceData = await conferenceResponse.json();
//     console.log(conferenceData);
//     root.render(
//       <React.StrictMode>
//         <Conference conferences={conferenceData.conferences} />
//       </React.StrictMode>
//     )
//   } else {
//     console.error(conferenceResponse);
//   }

// }

// loadConferences();