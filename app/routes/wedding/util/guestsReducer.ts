import { cloneDeep } from "lodash";
import type { Guest } from "~/routes/wedding/guest.model";

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
