import React, { memo, useEffect, useState } from 'react';
import KaeruButton from './KaeruButton';
import DemoBlock from './Block';
import Clock from './Clock';
import axios, { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { NoticeBar } from 'antd-mobile';
import { Current } from 'models/Current';

const App = () => {
  const [serverCurrent, setServerCurrent] = useState<string | undefined>();
  const [lastRefreshAt, setRefreshCurrentAt] = useState<
    dayjs.Dayjs | undefined
  >();
  const [apiErrorText, setApiErrorText] = useState<string | undefined>();
  const [errorVisible, setErrorVisible] = useState(false);

  const fetchCurrentTask = async () => {
    try {
      const res = await axios.get<Current>('http://192.168.0.4:58080/api/v1/current');
      setRefreshCurrentAt(() => dayjs());
      const { status, data } = res || {};
      if (status !== 200) {
        throw new Error();
      }
      setServerCurrent(data.current || '');
    } catch (e: unknown) {
      (e as AxiosError<unknown>).response?.status;
      setApiErrorText((e as AxiosError<unknown>).response?.statusText);
    }
  };

  useEffect(() => {
    const refreshTimer = setTimeout(
      fetchCurrentTask,
      serverCurrent == null ? 0 : 30 * 60 * 1000
    );
    return () => clearTimeout(refreshTimer);
  }, [serverCurrent]);

  useEffect(() => {
    if (apiErrorText) {
      setErrorVisible(true);
    }
  });

  return (
    <div>
      {errorVisible && (
        <NoticeBar closeable color="error" content={apiErrorText} />
      )}
      <DemoBlock title="ボタンが変わるよ">
        <KaeruButton />
      </DemoBlock>
      <DemoBlock title="時計">
        <Clock
          lastRefreshAt={lastRefreshAt}
          serverCurrentTime={dayjs(serverCurrent, 'YYYY-MM-DDTHH:mm:ss')}
        />
      </DemoBlock>
    </div>
  );
};

export default memo(App);
