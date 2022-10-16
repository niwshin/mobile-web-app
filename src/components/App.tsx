import React, { memo } from 'react';
import { GlobalStoreProvider } from '../store/GlobalStore';
import CurrentTime from './CurrentTime';
import { NotifyContextProvider } from '../store/NotifyContext';

const App = () => {
  return (
    <GlobalStoreProvider>
      <NotifyContextProvider>
        <CurrentTime />
      </NotifyContextProvider>
    </GlobalStoreProvider>
  );
};

export default memo(App);
