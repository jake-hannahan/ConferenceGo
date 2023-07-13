import MainPage from './components/pages/MainPage';
import Nav from './components/navbar/Nav';
import AttendeesList from './components/lists/AttendeesList';
import LocationForm from './components/forms/LocationForm';
import ConferenceForm from './components/forms/ConferenceForm';
import AttendConferenceForm from './components/forms/AttendConferenceForm';
import PresentationForm from './components/forms/PresentationForm';
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App(props) {
  if (props.attendees === undefined) {
    return null;
  }
    return (
      <BrowserRouter>
          <Nav />
            <Routes>
              <Route index element={<MainPage />} />
              <Route path="conferences/new" element={<ConferenceForm />} />
              <Route path="attendees/new" element={<AttendConferenceForm />} />
              <Route path="locations/new" element={<LocationForm />} />
              <Route path="presentations/new" element={<PresentationForm />} />
              <Route path="attendees" element={<AttendeesList attendees={props.attendees}/>} />
            </Routes>
      </BrowserRouter>
    );
}

export default App;
