import { Space } from 'antd-mobile';
import { GlobalOutline } from 'antd-mobile-icons';
import dayjs from 'dayjs';
import React, { useContext } from 'react';
import GlobalStore from '../store/GlobalStore';
import useClock from '../hooks/useClock';

const Clock = () => {
  const { globalStore } = useContext(GlobalStore);
  const now = useClock({
    current: globalStore.current,
    lastRefreshAt: globalStore.lastRefreshedAt,
  });
  return (
    <Space>
      {now?.format('YYYY-MM-DD HH:mm:ss')}
      {globalStore.lastRefreshedAt?.isValid() ? (
        <GlobalOutline color={'var(--adm-color-primary)'} />
      ) : (
        <GlobalOutline color={'var(--adm-color-weak)'} />
      )}
    </Space>
  );
};

export default Clock;
