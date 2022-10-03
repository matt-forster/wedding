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
import { ArrowPathIcon } from '@heroicons/react/20/solid'

interface Context extends AppLoadContext {
  NOTION_API_KEY: string;
  DATABASE_ID: string;
}

export const loader: LoaderFunction = async ({ request, params, context }) => {
  const { NOTION_API_KEY, DATABASE_ID } = context as Context;
  if (!params.rsvpCode) return {};

  return {
    rvspCode: params.rvspCode,
    guests: await getGuestsByCode(
      new Client({ auth: NOTION_API_KEY }),
      DATABASE_ID,
      params.rsvpCode
    ),
  };
};

export const action: ActionFunction = async ({ request, context }) => {
  const { NOTION_API_KEY } = context as Context;
  const data = await request.formData();
  const guests = formDataToGuests(data);
  guests.forEach((guest) => (guest.rsvpReceived = true));
  await updateGuests(new Client({ auth: NOTION_API_KEY }), guests);
  const [, , rsvpCode] = new URL(request.url).pathname.split("/");
  return redirect(`/wedding/${rsvpCode}#rsvp`);
};

export default function () {
  const transition = useTransition();
  const { guests } = useLoaderData<{ guests: Guest[] }>();
  const [common, dispatchCommonChange] = useReducer(
    guestReducer,
    guests.find((guest) => guest.primary) as Guest
  );
  const [received, setReceived] = useState(common.rsvpReceived);
  const CommonTextbox = Textbox(dispatchCommonChange);

  useEffect(() => {
    if (transition.state === "loading") setReceived(true);
  }, [transition.state]);

  return (
    <div className="grid place-items-center mt-10">
      {received && (
        <div className="font-bold">
          Your response has been received - feel free to update it anytime.
        </div>
      )}
      {common.roomAssignment === undefined || (
        <div className="mt-4 w-3/4 text-center text-sm">
          Your party has been assigned to a room!
          <br />
          We will send an email out later if you decide to stay, with the room
          number and occupants.
          <div className="mt-4 italic font-light">
            Reminder: there is a chance of sharing a room with family or
            friends. We will do our best, and let us know if there are any issues.
          </div>
        </div>
      )}
      <Form replace method="post">
        <fieldset disabled={["submitting", "loading"].includes(transition.state)} className="grid gap-4 m-4 w-96 place-items-start">
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
        <div className="grid place-items-center">
          <button
            type="submit"
            className="mt-4 bg-transparent hover:bg-[#81a1c1] text-[#5e81ac] font-semibold hover:text-white py-2 px-4 border border-[#5e81ac] hover:border-transparent rounded"
          >
            {["submitting", "loading"].includes(transition.state) ? <ArrowPathIcon className="animate-spin h-6 w-6" /> : received ? "Update" : "Submit"}
          </button>
        </div>
      </Form>
    </div>
  );
}
