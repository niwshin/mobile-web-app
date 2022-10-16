import { Space } from 'antd-mobile';
import { GlobalOutline } from 'antd-mobile-icons';
import dayjs from 'dayjs';
import React from 'react';
import useClock from '../hooks/useClock';

interface ClockProps {
  lastRefreshAt?: dayjs.Dayjs;
  serverCurrentTime?: dayjs.Dayjs;
}

const Clock = ({ serverCurrentTime, lastRefreshAt }: ClockProps) => {
  const now = useClock({ current: serverCurrentTime, lastRefreshAt });
  return (
    <Space>
      {now?.format('YYYY-MM-DD HH:mm:ss')}
      {serverCurrentTime?.isValid() ? (
        <GlobalOutline color={'var(--adm-color-primary)'} />
      ) : (
        <GlobalOutline color={'var(--adm-color-weak)'} />
      )}
    </Space>
  );
};

export default Clock;
