import type {
  ActionFunction,
  AppLoadContext,
  LoaderFunction,
} from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";
import { Form, useLoaderData, useTransition } from "@remix-run/react";
import { useEffect, useReducer, useState } from "react";
import { getGuestsByCode, updateGuests } from "./guest.repository";
import { guestReducer } from "./util/guestsReducer";
import GuestRSVPFields from "./components/GuestRSVPFields";
import { Client } from "@notionhq/client";
import { Textbox } from "./components/Textbox";
import type { Guest } from "./guest.model";
import { formDataToGuests } from "./guest.model";
import { ArrowPathIcon, CheckBadgeIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";

interface Context extends AppLoadContext {
  NOTION_API_KEY: string;
  DATABASE_ID: string;
}

export const loader: LoaderFunction = async ({ request, params, context }) => {
  const { NOTION_API_KEY, DATABASE_ID } = context as Context;
  if (!params.rsvpCode) return {};
  const client = new Client({ auth: NOTION_API_KEY });
  const guests = await getGuestsByCode(
    client,
    DATABASE_ID,
    params.rsvpCode
  );

  await updateGuests(client, guests.map(guest => ({
    id: guest.id,
    rsvpOpened: true
  })));

  return {
    rvspCode: params.rvspCode,
    guests: guests
  };
};

export const action: ActionFunction = async ({ request, context }) => {
  const { NOTION_API_KEY } = context as Context;
  const data = await request.formData();
  const action = data.get("action");
  const guests = formDataToGuests(data);
  if (action === "submit") {
    guests.forEach((guest) => (guest.rsvpReceived = true));
  }

  await updateGuests(new Client({ auth: NOTION_API_KEY }), guests);
  const [, , rsvpCode] = new URL(request.url).pathname.split("/");
  return redirect(`/wedding/${rsvpCode}#rsvp`);
};

export default function () {
  const transition = useTransition();
  const { guests } = useLoaderData<{ guests: Guest[] }>();

  if (!guests.length) {
    return (
      <div className="grid place-items-stretch text-center justify-items-center mt-10">
        <div className="m-10 p-4 content font-bold rounded-md bg-[#3b4252] drop-shadow-md">
          <ExclamationTriangleIcon className="inline h-8 w-8 text-[#d08770]" />{" "}
          This code is not valid - check your invite for the correct code.
        </div>
      </div>
    );
  }

  const [common, dispatchCommonChange] = useReducer(
    guestReducer,
    guests.find((guest) => guest.primary) as Guest
  );

  const [received, setReceived] = useState(Boolean(common.rsvpReceived));
  const CommonTextbox = Textbox(dispatchCommonChange);

  useEffect(() => {
    setReceived(Boolean(common.rsvpReceived));
    if (transition.submission?.formData.get("action") === "submit") {
      setReceived(true);
    }
  }, [transition.state, transition.submission, common.rsvpReceived]);

  return (
    <div className="grid place-items-stretch text-center justify-items-center mt-10">
      {received && (
        <div className="mt-0 m-10 p-4 content font-bold rounded-md bg-[#5e81ac] drop-shadow-md">
          <CheckBadgeIcon className="inline h-8 w-8 text-[#a3be8c]" /> Your
          response has been received, thank you.
        </div>
      )}

      {common.roomAssignment === undefined || (
        <div className="mt-4 w-3/4 text-center">
          Your party has been assigned to a room! If you want to stay on site,
          please indicate such below.
          <br />
          <br />
          We will send an email out later if you decide to stay, with the room
          number and occupants.
          <div className="mt-4 italic font-light">
            Reminder: there is a chance of sharing a room with family or
            friends. We will do our best, and let us know if there are any
            issues.
          </div>
        </div>
      )}

      <Form method="post" className="grid place-items-center w-full">
        <fieldset
          disabled={["submitting", "loading"].includes(transition.state)}
          className="grid gap-4 m-4 place-items-start text-left"
        >
          {/* LATER: enable this when we have assigned rooms */}
          {/* {common.stayingOnSite === false || <div>Room Assignment: {common.roomAssignment}</div>} */}

          {guests.map((guest) => (
            <div key={guest.id}>
              <GuestRSVPFields guest={guest} />
            </div>
          ))}

          <CommonTextbox
            label="Contact Email"
            guest={common}
            attribute="email"
          />
          <CommonTextbox label="Comments" guest={common} attribute="comments" />
        </fieldset>

        <button
          type="submit"
          name="action"
          value="submit"
          className="mt-4 bg-[#5e81ac] hover:bg-[#81a1c1] text-[#d8dee9] font-semibold hover:text-white py-2 px-4 border border-[#5e81ac] hover:border-transparent rounded"
          disabled={["submitting", "loading"].includes(transition.state)}
        >
          {["submitting", "loading"].includes(transition.state) ? (
            <ArrowPathIcon className="animate-spin h-6 w-6" />
          ) : received ? (
            "Update"
          ) : (
            "Submit"
          )}
        </button>
      </Form>
    </div>
  );
}
