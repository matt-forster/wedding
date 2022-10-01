import type { Guest } from "~/models/types";

export const Textbox = (
  dispatch: React.Dispatch<{ attribute: keyof Guest; value: any }>
) => {
  return function Textbox({
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
          type="text"
          className="block w-full rounded-md text-black text-center border-gray-300 h-6 focus:border-[#88c0d0] focus:ring-[#8fbcbb] sm:text-sm"
          name={`${guest.id}.${attribute}`}
          defaultValue={guest[attribute] as string}
          onBlur={(e) =>
            dispatch({
              attribute,
              value: e.target.value,
            })
          }
        />
      </label>
    );
  };
};
