import { RouterAction } from 'connected-react-router';

export enum ControlBoardActionTypes {}

export type ControlBoardAction =
  | { type: ControlBoardActionTypes; payload?: any }
  | RouterAction;
