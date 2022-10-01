import type {
  PageObjectResponse,
  PartialPageObjectResponse,
  QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";
import type { Guest } from './types';

const pageHasProperties = (
  page: PageObjectResponse | PartialPageObjectResponse
): page is PageObjectResponse => Object.hasOwn(page, "properties");

type TitleProperty = {title: [{plain_text: string}]};
const propertyIsTitle = (property: any): property is TitleProperty => property.type === "title";

type RichTextProperty = {rich_text: [{plain_text: string}]};
const propertyIsRichText = (property: any): property is RichTextProperty => property.type === "rich_text";

type SelectProperty = {select: {name: string}};
const propertyIsSelect = (property: any): property is SelectProperty => property.type === "select";

type CheckboxProperty = {checkbox: boolean};
const propertyIsCheckbox = (property: any): property is CheckboxProperty => property.type === "checkbox";

const propertySerializer = (page: PageObjectResponse) => {
  const { properties } = page;
  return {
    getTitle: (key: string) => {
      const property = properties[key];
      if (propertyIsTitle(property)) {
        return property.title[0].plain_text;
      }

      throw new Error(`Invalid property type - ${key} is not a title`);
    },
    getRichText: (key: string) => {
      const property = properties[key];
      if (propertyIsRichText(property)) {
        return property.rich_text[0]?.plain_text;
      }
    },
    getSelect: (key: string) => {
      const property = properties[key];
      if (propertyIsSelect(property)) {
        return property.select?.name;
      }
    },
    getCheckbox: (key: string) => {
      const property = properties[key];
      if (propertyIsCheckbox(property)) {
        return property.checkbox;
      }

      return false;
    },
  };
}

const pageToGuest = (
  page: PageObjectResponse | PartialPageObjectResponse
): Guest => {
  if (!pageHasProperties(page))
    throw new Error("Invalid page type - no properties");

  const {getTitle, getRichText, getSelect, getCheckbox} = propertySerializer(page);
  return {
    id: page.id,
    name: getTitle("name"),
    comments: getRichText("comments"),
    mealNotes: getRichText("mealNotes"),
    email: getRichText("email"),
    roomAssignment: getRichText("roomAssignment"),
    mealChoice: {
      key: getSelect("mealChoice"),
      value: getSelect("mealChoice"),
    },
    stayingOnSite: getCheckbox("stayingOnSite"),
    attendingBreakfast: getCheckbox("attendingBreakfast"),
    rsvpOpened: getCheckbox("rsvpOpened"),
    rsvpReceived: getCheckbox("rsvpReceived"),
    attending: getCheckbox("attending"),
  };
};

export const serializeGuests = (data: QueryDatabaseResponse): Guest[] =>
  data.results.map(pageToGuest);

// export const serializeToRecord = (
//   guest: Guest
// ): Partial<PageObjectResponse> => ({
//   id: guest.id,
//   properties: {
//     mealNotes: {
//       rich_text: [
//         {
//           text: {
//             content: guest.mealNotes,
//           },
//         },
//       ],
//     },
//     comments: {
//       rich_text: [
//         {
//           text: {
//             content: guest.comments,
//           },
//         },
//       ],
//     },
//     email: {
//       rich_text: [
//         {
//           text: {
//             content: guest.comments,
//           },
//         },
//       ],
//     },
//     mealChoice: {
//       select: {
//         id: guest.mealChoice.key,
//         name: guest.mealChoice.value,
//       },
//     },
//     stayingOnSite: {
//       checkbox: guest.stayingOnSite,
//     },
//     stayingForBreakfast: {
//       checkbox: guest.stayingForBreakfast,
//     },
//     rsvpOpened: {
//       checkbox: guest.rsvpOpened,
//     },
//     attending: {
//       checkbox: guest.attending,
//     },
//     rsvpReceived: {
//       checkbox: guest.rsvpReceived,
//     },
//   },
// });
