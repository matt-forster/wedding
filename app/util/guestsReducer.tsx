import cloneDeep from "lodash.clonedeep";
import type { Guest } from "~/models/types";

export const guestReducer = <T extends Guest, K extends keyof T>(
  guest: T,
  {
    attribute,
    value,
    clone = false,
  }: { value: any; attribute: K; clone?: boolean }
) => {
  guest[attribute] = value;
  return clone ? cloneDeep(guest) : guest;
};
