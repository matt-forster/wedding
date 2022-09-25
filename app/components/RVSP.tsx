export default function RVSP() {
  return (
    <div>
      <div id="rsvp">
        <h2>RSVP</h2>
        <p>You can come back and update this anytime before May 1st, 2021.</p>

        <form action="#">
          <label className="color:white">
            Invite Code:
            <input id="invite-code"></input>
          </label>

          <input
            id="submit-invite-code"
            type="button"
            value="Find RSVP"
            // onclick="rsvpGen()"
          />
        </form>

        <form id="rsvp-form" action="#"></form>
        <div>
          <i id="loading-icon"></i>
        </div>
      </div>
    </div>
  );
}
