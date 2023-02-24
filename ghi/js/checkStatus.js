// Get the cookie out of the cookie store
console.log(document.cookie);
const payloadCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("jwt_access_payload="))
    ?.split("=")[1];

if (payloadCookie) {
    // console.log(payloadCookie);
  // The cookie value is a JSON-formatted string, so parse it
//    const encodedPayload = JSON.parse(payloadCookie.value);

  // Convert the encoded payload from base64 to normal string
//  const decodedPayload = // FINISH THIS
    const decodedPayload = atob(payloadCookie);
    // console.log(decodedPayload);
  // The payload is a JSON-formatted string, so parse it
//  const payload = // FINISH THIS
    const payload = JSON.parse(decodedPayload);
    // console.log(payload);

  // Print the payload
//  console.log(payload);

  // Check if "events.add_conference" is in the permissions.
  // If it is, remove 'd-none' from the link
   //console.log(payload.user.perms);
    if (payload.user.perms.includes("events.add_conference")) {
        const conferenceLink = document.getElementById("conference-link");
        conferenceLink.classList.remove('d-none');
    }
    if (payload.user.perms.includes("events.add_location")) {
        const locationLink = document.getElementById("location-link");
        locationLink.classList.remove('d-none');
    }

  // Check if "events.add_location" is in the permissions.
  // If it is, remove 'd-none' from the link

}
