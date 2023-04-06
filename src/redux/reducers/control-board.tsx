import {
  ControlBoardActionTypes,
  ControlBoardAction
} from '../actions/control-board';

type InitialState = {
  error: null | string;
  loading: boolean;
  searching: boolean;
  saving: boolean;
};

const initialState: InitialState = {
  error: null,
  loading: false,
  searching: false,
  saving: false
};

export default function controlBoardsReducer(
  state = initialState,
  action: ControlBoardAction
): typeof initialState {
  switch (action.type) {
    default:
      return state;
  }
}
