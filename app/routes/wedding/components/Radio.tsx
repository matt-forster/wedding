import type { Guest } from "~/routes/wedding/guest.model";

export const Radio = (
  dispatch: React.Dispatch<{
    attribute: keyof Guest;
    value: any;
    clone: boolean;
  }>
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
      <label className={"inline " + (className ?? "")}>
        {label}
        <fieldset className="ml-6">
          <label>
            Yes
            <input
              type="radio"
              className="inline m-2"
              name={`${guest.id}.${attribute}`}
              value="true"
              checked={Boolean(guest[attribute]) === true}
              onChange={(e) =>
                dispatch({
                  attribute,
                  value: true,
                  clone: true,
                })
              }
            />
          </label>
          <label>
            No
            <input
              type="radio"
              className="inline m-2"
              name={`${guest.id}.${attribute}`}
              value="false"
              checked={(guest[attribute] ?? false) === false}
              onChange={(e) =>
                dispatch({
                  attribute,
                  value: false,
                  clone: true,
                })
              }
            />
          </label>
        </fieldset>
      </label>
    );
  };
};
