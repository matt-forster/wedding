import { useReducer } from "react";
import type { Guest } from "~/models/types";
import { guestReducer } from "~/util/guestsReducer";
import { Checkbox } from "./Checkbox";
import { Textbox } from "./Textbox";

export default function RSVPForm({
  guest: initialGuest,
}: {
  guest: Guest;
}): JSX.Element {
  const [guest, dispatchGuestChange] = useReducer(guestReducer, initialGuest);

  const GuestTextBox = Textbox(dispatchGuestChange);
  const GuestCheckbox = Checkbox(dispatchGuestChange);

  return (
    <>
      <div>{guest.name}</div>
      <GuestCheckbox guest={guest} attribute="attending" />
      {guest.attending ? (
        <>
          {guest.roomAssignment === undefined || (
            <GuestCheckbox guest={guest} attribute="stayingOnSite" />
          )}

          <GuestTextBox guest={guest} attribute="mealNotes" />
          <GuestCheckbox guest={guest} attribute="attendingBreakfast" />
        </>
      ) : null}
    </>
  );
}
