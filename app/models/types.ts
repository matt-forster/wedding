export type Guest = {
  id: string;
  name: string;
  comments?: string;
  mealNotes?: string;
  email?: string;
  mealChoice: {
    key?: string;
    value?: string;
  };
  stayingOnSite: boolean;
  attendingBreakfast: boolean;
  // passive properties
  roomAssignment?: string;
  rsvpOpened: boolean;
  attending: boolean;
  rsvpReceived: boolean;
};

export const MealSelect: Record<string, string> = Object.freeze({
  '}H{o': 'Meal 1',
  '=ErF': 'Meal 2',
  'efX>': 'Meal 3'
})
