import React, { useContext, useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { Current } from 'models/Current';
import Contents from './Contents';
import NoticeBarBlock from './NoticeBarBlock';
import GlobalStore from '../store/GlobalStore';
import NotifyContext from '../store/NotifyContext';

const CurrentTime = () => {
  const { globalStore, dispatchGlobal } = useContext(GlobalStore);
  const { dispatch: dispatchNotify } = useContext(NotifyContext);
  const [apiErrorText, setApiErrorText] = useState<string | undefined>();

  const fetchCurrentTask = async () => {
    try {
      const res = await axios.get<Current>(
        'http://192.168.0.4:58080/api/v1/current1'
      );
      console.log({ res });
      const { status, data } = res || {};
      if (status !== 200) {
        Promise.reject();
      } else {
        console.log('succeeded to get time');
        const lastRefreshedAt = dayjs();
        dispatchGlobal({
          type: 'REFRESH_CURRENT_TIME',
          payload: {
            current: dayjs(data.current, 'YYYY-MM-DDTHH:mm:ss'),
            lastRefreshedAt,
          },
        });
      }
    } catch (e: unknown) {
      setApiErrorText((e as AxiosError<unknown>).response?.statusText);
    }
  };

  useEffect(() => {
    const refreshTimer = setTimeout(
      fetchCurrentTask,
      globalStore.current == null ? 0 : 30 * 60 * 1000
    );
    return () => clearTimeout(refreshTimer);
  }, [globalStore.current]);

  useEffect(() => {
    if (apiErrorText) {
      dispatchNotify({
        type: 'ADD_NOTIFICATION',
        payload: {
          notifications: [
            {
              type: 'error',
              content: 'サーバー時刻取得失敗',
            },
          ],
        },
      });
    }
  }, [apiErrorText]);

  return (
    <>
      <NoticeBarBlock />
      <Contents />
    </>
  );
};

export default CurrentTime;
