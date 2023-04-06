export type Preferences = {
  theme: null | string;
};

const initialState: Preferences = {
  theme: 'light'
};

export default function preferencesReducer(
  state = initialState,
  action: { type: string }
): typeof initialState {
  switch (action.type) {
    default:
      return state;
  }
}
