import type { NotionDatabase } from "./database";
import serializeDatabase from "./database";
import serializePage from "./page";

export type NotionGuest = {
  id: string;
  Name: {
    id: string;
    title: [
      {
        type: "text";
        plain_text: string;
      }
    ];
  };
};

export const filter = (code: string) => ({
  and: [
    {
      property: "rvspCode",
      rich_text: {
        equals: code,
      },
    },
  ],
});

export type Guest = {
  id: string;
  name: string;
};

const fromDatabase = (database: NotionDatabase<NotionGuest>): NotionGuest[] =>
  serializeDatabase(database).map(serializePage);

const pageToGuest = (page: NotionGuest): Guest => {
  return {
    id: page.id,
    name: page.Name.title[0].plain_text,
  };
};

export default (data: NotionDatabase<NotionGuest>): Guest[] =>
  fromDatabase(data).map(pageToGuest);
