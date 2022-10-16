import { NoticeBar } from 'antd-mobile';
import React, { memo, useContext } from 'react';
import NotifyContext from '../store/NotifyContext';

const NoticeBarBlock = () => {
  const { notifications } = useContext(NotifyContext);
  return (
    <>
      {(notifications || []).map((x, idx) => (
        <NoticeBar
          closeable
          color={x.type || 'error'}
          content={x.content}
          key={`notify-${idx}`}
        />
      ))}
    </>
  );
};

export default memo(NoticeBarBlock);
