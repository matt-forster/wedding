import type { Guest } from "~/routes/wedding/guest.model";

export const Textbox = (
  dispatch: React.Dispatch<{ attribute: keyof Guest; value: any }>
) => {
  return function Textbox({
    guest,
    attribute,
    label
  }: {
    guest: Guest;
    attribute: keyof Guest;
    label: string;
  }): JSX.Element {
    return (
      <label className="m-2 block text-sm font-medium">
        {label}
        <input
          type="text"
          className="ml-4 p-2 block w-4/5 md:w-full rounded-md text-black border-gray-300 h-6 focus:border-[#88c0d0] focus:ring-[#8fbcbb] sm:text-sm"
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
