import type {
  PageObjectResponse,
  PartialPageObjectResponse,
  QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";

export enum MealChoice {
  One = 'Lamb Duo - Rack & Tenderloin roulade',
  Two = 'Grilled Veal - Portobello mushroom',
  Three = 'Ratatouille (V) - Bell pepper cup'
}

export type Guest = {
  id: string;
  name: string;
  comments?: string;
  mealNotes?: string;
  email?: string;
  mealChoice?: MealChoice;
  stayingOnSite: boolean;
  stayingFriday: boolean;
  attendingBreakfast: boolean;
  // passive properties
  roomAssignment?: string;
  rsvpOpened: boolean;
  attending: boolean;
  rsvpReceived: boolean;
  primary: boolean;
  isKid: boolean;
};

export const pageHasProperties = (
  page: PageObjectResponse | PartialPageObjectResponse
): page is PageObjectResponse => Object.hasOwn(page, "properties");

type TitleProperty = { title: [{ plain_text: string }] };
const propertyIsTitle = (property: any): property is TitleProperty =>
  property.type === "title";

type RichTextProperty = { rich_text: [{ plain_text: string }] };
const propertyIsRichText = (property: any): property is RichTextProperty =>
  property.type === "rich_text";

type SelectProperty = { select: { name: string } };
const propertyIsSelect = (property: any): property is SelectProperty =>
  property.type === "select";

type CheckboxProperty = { checkbox: boolean };
const propertyIsCheckbox = (property: any): property is CheckboxProperty =>
  property.type === "checkbox";

export const formDataToGuests = (data: FormData): Partial<Guest>[] => {
  const guests: Partial<Guest>[] = [];
  for (const [key, value] of data.entries()) {
    // serialize out ID.attribute
    const [id, attribute] = key.split(".") as [string, keyof Guest];
    if (!id || !attribute) continue;
    // add guest if ID doesn't identify
    let guest;
    guest = guests.find((g) => g.id === id);
    if (!guest) {
      guest = { id };
      guests.push(guest);
    }
    // add attribute to guest
    guest[attribute] = value === "on" ? true : (value as any);
  }

  return guests;
};

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
    getSelect: <T>(key: string, defaultChoice: T) => {
      const property = properties[key];
      if (propertyIsSelect(property)) {
        return (property.select?.name as T) ?? defaultChoice;
      }

      return defaultChoice;
    },
    getCheckbox: (key: string) => {
      const property = properties[key];
      if (propertyIsCheckbox(property)) {
        return property.checkbox;
      }

      return false;
    },
  };
};

const propertyDeserializer = (guest: Partial<Guest>) => {
  return {
    setTitle: (key: keyof Guest) => {
      if (guest[key] === undefined) return {};

      return {
        [key]: {
          title: [
            {
              type: "text",
              text: {
                content: guest[key],
              },
            },
          ],
        },
      };
    },
    setRichText: (key: keyof Guest) => {
      if (guest[key] === undefined) return {};

      return {
        [key]: {
          rich_text: [
            {
              type: "text",
              text: {
                content: guest[key],
              },
            },
          ],
        },
      };
    },
    setSelect: (key: keyof Guest) => {
      const selectIsDefined = (value: any): value is string =>
        guest[key] !== undefined;
      const select = guest[key];
      if (!selectIsDefined(select)) return {};

      return {
        [key]: {
          select: {
            name: select,
          },
        },
      };
    },
    setCheckbox: (key: keyof Guest) => {
      if (!guest[key]) return {};
      return {
        [key]: {
          type: "checkbox",
          checkbox: guest[key] ? Boolean(guest[key]) : false,
        },
      };
    },
    setRadio: (key: keyof Guest) => {
      if (!guest[key]) return {};
      return {
        [key]: {
          type: "checkbox",
          checkbox: guest[key] ? guest[key] === "true" : false,
        },
      };
    },
  };
};

const pageToGuest = (
  page: PageObjectResponse | PartialPageObjectResponse
): Guest => {
  if (!pageHasProperties(page))
    throw new Error("Invalid page type - no properties");

  const { getTitle, getRichText, getSelect, getCheckbox } =
    propertySerializer(page);
  return {
    id: page.id,
    name: getTitle("name"),
    comments: getRichText("comments"),
    mealNotes: getRichText("mealNotes"),
    email: getRichText("email"),
    roomAssignment: getRichText("roomAssignment"),
    mealChoice: getSelect<MealChoice>("mealChoice", MealChoice.One),
    stayingOnSite: getCheckbox("stayingOnSite"),
    stayingFriday: getCheckbox("stayingFriday"),
    attendingBreakfast: getCheckbox("attendingBreakfast"),
    rsvpOpened: getCheckbox("rsvpOpened"),
    rsvpReceived: getCheckbox("rsvpReceived"),
    attending: getCheckbox("attending"),
    primary: getCheckbox("primary"),
    isKid: getCheckbox("isKid"),
  };
};

export const serializeGuests = (data: QueryDatabaseResponse): Guest[] =>
  data.results.map(pageToGuest);

export const guestToProperties = (
  guest: Partial<Guest>
): Record<string, any> => {
  const { setRichText, setSelect, setCheckbox, setRadio } =
    propertyDeserializer(guest);

  return {
    ...setRichText("comments"),
    ...setRichText("mealNotes"),
    ...setRichText("email"),
    ...setSelect("mealChoice"),
    ...setRadio("stayingOnSite"),
    ...setRadio("stayingFriday"),
    ...setRadio("attendingBreakfast"),
    ...setCheckbox("rsvpOpened"),
    ...setCheckbox("rsvpReceived"),
    ...setCheckbox("attending"),
  };
};
