import type { Guest } from "~/routes/wedding/guest.model";

export const Checkbox = (
  dispatch: React.Dispatch<{ attribute: keyof Guest; value: any, clone: boolean }>
) => {
  return function Checkbox({
    guest,
    attribute,
    label,
    className,
  }: {
    guest: Guest;
    attribute: keyof Guest;
    label: string;
    className?: string;
  }): JSX.Element {
    return (
      <label className={(className ?? "") + "block"}>
        <input
          type="checkbox"
          className="inline m-2"
          name={`${guest.id}.${attribute}`}
          defaultChecked={guest[attribute] as boolean}
          onChange={(e) =>
            dispatch({
              attribute,
              value: Boolean(e.target.checked),
              clone: true,
            })
          }
        />
        {label}
      </label>
    );
  };
};
