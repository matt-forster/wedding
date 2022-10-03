import { MealChoice } from "~/routes/wedding/guest.model";
import type { Guest } from "~/routes/wedding/guest.model";

const mealSelected = (option: MealChoice, mealSelected: Guest["mealChoice"]) =>
  option === mealSelected;

const MealOption = ({
  guest,
  option,
}: {
  guest: Guest;
  option: MealChoice;
}): JSX.Element => (
  <option value={option} selected={mealSelected(option, guest.mealChoice)}>
    {option}
  </option>
);

export function GuestMealDropdown({
  guest,
  attribute,
  label,
}: {
  guest: Guest;
  attribute: keyof Guest;
  label: string;
}) {
  return (
    <label className="m-2 block text-sm font-medium">
      {label}
      <select
        name={`${guest.id}.${attribute}`}
        className="inline ml-4 w-1/2 md:w-full rounded-md text-black border-gray-300 h-6 focus:border-[#88c0d0] focus:ring-[#8fbcbb] sm:text-sm"
      >
        <MealOption guest={guest} option={MealChoice.One} />
        <MealOption guest={guest} option={MealChoice.Two} />
        <MealOption guest={guest} option={MealChoice.Three} />
      </select>
    </label>
  );
}
