import React, {
  createContext,
  ReactElement,
  ReactNode,
  useReducer,
} from 'react';

/**
 * use type + content pair for add notify or only key for remove
 */
type NotifiCation = {
  type?: 'alert' | 'default' | 'error' | 'info' | undefined; // same as 'color' prop in NotifyBar
  content?: ReactNode | string;
  key?: string; // not same as react key
};

type Notifications = {
  notifications: NotifiCation[];
};

type NotifyAction = 'ADD_NOTIFICATION' | 'REMOVE_NOTIFICATION';

export type DispatchNotify = {
  type: NotifyAction;
  payload: Notifications;
};

const reducer = (
  notifications: NotifiCation[] = [],
  action: DispatchNotify
): NotifiCation[] => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return [...notifications, ...action.payload.notifications];
    case 'REMOVE_NOTIFICATION':
      return notifications.filter((x) =>
        action.payload.notifications.reduce(
          (acc, { key }) => x.key === key,
          false
        )
      );
    default:
      return notifications;
  }
};

const initialState = [] as NotifiCation[];

const NotifyContext = createContext({
  notifications: [] as NotifiCation[],
  dispatch: {} as React.Dispatch<DispatchNotify>,
});

type NotifyContextProps = {
  children: ReactNode;
};

export const NotifyContextProvider = ({
  children,
}: NotifyContextProps): ReactElement => {
  const [notifications, dispatch] = useReducer(reducer, initialState);
  const { Provider } = NotifyContext;
  return <Provider value={{ notifications, dispatch }}>{children}</Provider>;
};

export default NotifyContext;
