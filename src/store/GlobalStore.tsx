import dayjs from 'dayjs';
import React, {
  createContext,
  ReactElement,
  ReactNode,
  useEffect,
  useReducer,
} from 'react';

type GlobalStoreBase = {
  current: dayjs.Dayjs;
  lastRefreshedAt: dayjs.Dayjs;
  clockIn: string;
  clockOut: string;
  token: string;
};

export type GlobalStoreType = Partial<GlobalStoreBase>;

type GlobalStoreAction =
  | 'CLOCK_IN'
  | 'CLOCK_OUT'
  | 'REFRESH_CURRENT_TIME'
  | 'LOGIN';

export type DispatchGlobalStore = {
  type: GlobalStoreAction;
  payload: GlobalStoreType;
};

const reducer = (
  state: GlobalStoreType = {},
  action: DispatchGlobalStore
): GlobalStoreType => {
  switch (action.type) {
    case 'CLOCK_IN':
      return {
        ...state,
        current: action.payload.current,
        lastRefreshedAt: action.payload.lastRefreshedAt,
        clockIn: action.payload.clockIn,
      };
    case 'CLOCK_OUT':
      return {
        ...state,
        current: action.payload.current,
        lastRefreshedAt: action.payload.lastRefreshedAt,
        clockIn: action.payload.clockIn,
        clockOut: action.payload.clockOut,
      };
    case 'REFRESH_CURRENT_TIME':
      return {
        ...state,
        current: action.payload.current,
        lastRefreshedAt: action.payload.lastRefreshedAt,
      };
    case 'LOGIN':
      return {
        ...state,
        token: action.payload.token,
      };
    default:
      return state;
  }
};

const initialState = {
  token: 'helloworld',
};

const GlobalStore = createContext({
  globalStore: {} as GlobalStoreType,
  dispatchGlobal: {} as React.Dispatch<DispatchGlobalStore>,
});

type GlobalStoreProps = {
  children: ReactNode;
};

export const GlobalStoreProvider = ({
  children,
}: GlobalStoreProps): ReactElement => {
  const [globalStore, dispatchGlobal] = useReducer(reducer, initialState);
  const { Provider } = GlobalStore;
  return (
    <Provider value={{ globalStore, dispatchGlobal }}>{children}</Provider>
  );
};

export default GlobalStore;
