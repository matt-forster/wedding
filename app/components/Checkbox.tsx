import type { Guest } from "~/models/types";

export const Checkbox = (
  dispatch: React.Dispatch<{ attribute: keyof Guest; value: any, clone: boolean }>
) => {
  return function Checkbox({
    guest,
    attribute,
  }: {
    guest: Guest;
    attribute: keyof Guest;
  }): JSX.Element {
    return (
      <label className="block text-sm font-medium">
        {attribute}
        <input
          type="checkbox"
          name={`${guest.id}.${attribute}`}
          defaultChecked={guest[attribute] as boolean}
          onChange={(e) =>
            dispatch({
              attribute,
              value: e.target.checked,
              clone: true
            })
          }
        />
      </label>
    );
  };
};
