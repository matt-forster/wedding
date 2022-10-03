import type { Client } from "@notionhq/client";
import type { Guest } from "./guest.model";
import { guestToProperties, serializeGuests } from "./guest.model";

export const getGuestsByCode = async (
  notion: Client,
  databaseId: string,
  code: string
): Promise<Guest[]> => {
  // get guests
  const guests = serializeGuests(
    await notion.databases.query({
      database_id: databaseId,
      filter: codeFilter(code),
      sorts: [propertySort("name")],
    })
  );

  guests.forEach((guest) => guest.rsvpOpened = true);
  await updateGuests(
    notion,
    guests
  );

  return guests;
};

export const updateGuest = async (
  notion: Client,
  guest: Partial<Guest>
) => {
  return await notion.pages.update({
    page_id: guest.id as string,
    properties: guestToProperties(guest),
  });
};

export const updateGuests = async (
  notion: Client,
  guests: Partial<Guest>[]
) => {
  await Promise.all(
    guests.map(async (guest) => await updateGuest(notion, guest))
  );
};

const codeFilter = (code: string) => ({
  and: [
    {
      property: "rsvpCode",
      rich_text: {
        equals: code,
      },
    },
  ],
});

const propertySort = (
  name: string
): { property: string; direction: "ascending" | "descending" } => ({
  property: name,
  direction: "descending",
});
