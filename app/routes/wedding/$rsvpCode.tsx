import type {
  ActionFunction,
  AppLoadContext,
  LoaderFunction} from "@remix-run/cloudflare";
import {
  redirect,
} from "@remix-run/cloudflare";
import { Form, useLoaderData, useTransition } from "@remix-run/react";
import { useReducer } from "react";
import { getGuestsByCode } from "~/repositories/guest";
import { guestReducer } from "~/util/guestsReducer";
import RSVPForm from "~/components/RSVPForm";
import { Client } from "@notionhq/client";
import { Textbox } from "~/components/Textbox";
import type { Guest } from "~/models/types";

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
  const data = await request.formData();
  console.log(data);
  const rvspCode = new URL(request.url).pathname.split("/")[2]
  return redirect(`/wedding/${rvspCode}#rsvp`);
};

export default function () {
  const { guests } = useLoaderData<{ guests: Guest[] }>();
  const [common, dispatchCommonChange] = useReducer(guestReducer, {
    ...guests[0],
  });

  const CommonTextbox = Textbox(dispatchCommonChange);

  return (
    <div className="grid place-items-center text-center w-1/3">
      <Form reloadDocument replace method="post">
        <fieldset
          className="grid gap-8 place-items-stretch"
        >
          {/* LATER: enable this when we have assigned rooms */}
          {/* {common.stayingOnSite === false || <div>Room Assignment: {common.roomAssignment}</div>} */}

          {guests.map((guest) => (
            <div key={guest.id}>
              <RSVPForm guest={guest} />
            </div>
          ))}

          <CommonTextbox guest={common} attribute="comments" />
          <CommonTextbox guest={common} attribute="email" />
        </fieldset>
        <button
          type="submit"
          className="mt-4 bg-transparent hover:bg-[#81a1c1] text-[#5e81ac] font-semibold hover:text-white py-2 px-4 border border-[#5e81ac] hover:border-transparent rounded"
        >
          Submit
        </button>
      </Form>
    </div>
  );
}
