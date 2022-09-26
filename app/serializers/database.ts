import type { NotionPage } from "./page";

export type NotionDatabase<T> = {
  object: "database";
  id: string;
  results: NotionPage<T>[];
};

export default <T>(database: NotionDatabase<T>): NotionPage<T>[] =>
  database.results;
