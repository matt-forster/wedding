import type { ActionFunction, LoaderFunction } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import type { Guest } from "~/serializers/guest";
import serializeGuests, { filter } from "~/serializers/guest";
const { Client } = require("@notionhq/client");

export const loader: LoaderFunction = async ({ request, params, context }) => {
  const { NOTION_API_KEY, DATABASE_ID } = context;
  if (!params.rvspCode) return {};

  const notion = new Client({ auth: NOTION_API_KEY });

  const guests = serializeGuests(
    await notion.databases.query({
      database_id: DATABASE_ID,
      filter: filter(params.rvspCode),
    })
  );

  return {
    guests,
    rvspCode: params.rvspCode,
  };
};

export const action: ActionFunction = async ({ request, context }) => {};

export default function () {
  const { guests } = useLoaderData();

  return (
    <>
      {guests.length > 0 && (
        <div className="grid place-items-stretch text-center">
          {guests.map((guest: Guest) => (
            <div key={guest.id}>{guest.name}</div>
          ))}
        </div>
      )}
    </>
  );
}
