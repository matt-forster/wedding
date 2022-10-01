import type { Client } from '@notionhq/client';
import type { Guest} from '~/models/types';
import { serializeGuests } from '~/models/guest';

export const getGuestsByCode = async (notion: Client, databaseId: string, code: string): Promise<Guest[]> => {

  // get guests
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: codeFilter(code)
  });

  // update guests viewed
  return serializeGuests(response);
}

export const updateGuests = async () => {}

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
