import Nav from './Nav';
// import ConferenceList from './ConferenceList';

function App(props) {
  if (props.attendees === undefined) {
    return null;
  }
    return (
      <>
        <Nav />

        <div className="container">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Attendee Name</th>
                <th>Conference</th>
              </tr>
            </thead>
            <tbody>
              {/* for (let attendee of props.attendees) {
                <tr>
                  <td>{ attendee.name }</td>
                  <td>{ attendee.conference }</td>
                </tr>
              } */}
              {props.attendees.map(attendee => {
                return (
                  <tr key={attendee.href}>
                    <td>{ attendee.name }</td>
                    <td>{ attendee.conference }</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
}

export default App;