import { useReducer } from "react";
import type { Guest } from "~/routes/wedding/guest.model";
import { guestReducer } from "~/routes/wedding/util/guestsReducer";
import { Checkbox } from "./Checkbox";
import { Radio } from "./Radio";
import { GuestMealDropdown } from "./MealDropdown";
import { Textbox } from "./Textbox";

export default function GuestRSVPFields({
  guest: initialGuest,
}: {
  guest: Guest;
}): JSX.Element {
  const [guest, dispatchGuestChange] = useReducer(guestReducer, initialGuest);

  const GuestTextBox = Textbox(dispatchGuestChange);
  const GuestCheckbox = Checkbox(dispatchGuestChange);
  const GuestRadio = Radio(dispatchGuestChange);

  return (
    <div className="contents sm:w-full">
      <div className="font-bold">{guest.name}</div>
      <div className="pl-8">
        <input type="hidden" name={`${guest.id}.id`} value={guest.id} />
        <GuestCheckbox
          label="Attending"
          guest={guest}
          attribute="attending"
          className="font-bold"
        />
        <div
          className={
            guest.attending ? "visible h-auto w-full " : "invisible h-0 w-full"
          }
        >
          <GuestMealDropdown
            label="Plate Selection"
            guest={guest}
            attribute="mealChoice"
          />
          <GuestTextBox
            label="Any food sensitivities or allergies?"
            guest={guest}
            attribute="mealNotes"
          />
          {guest.roomAssignment === undefined || (
            <GuestRadio
              label="Staying on site at Azure Ridge?"
              guest={guest}
              attribute="stayingOnSite"
              className="font-light"
            />
          )}
          {guest.roomAssignment === undefined || (
            <GuestRadio
              label="Staying an additional night (Friday, Extra cost)?"
              guest={guest}
              attribute="stayingOnSite"
              className="font-light"
            />
          )}
          <GuestRadio
            label="Attending breakfast on Sunday?"
            guest={guest}
            attribute="attendingBreakfast"
            className="font-light"
          />
        </div>
      </div>
    </div>
  );
}
