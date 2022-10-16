import React, { memo, ReactElement, useEffect, useState } from 'react';
import { KaeruType } from 'models/Kaeru';
import { Button, NoticeBar, Toast } from 'antd-mobile';
import {
  CheckCircleOutline,
  AddCircleOutline,
  ArrowDownCircleOutline,
} from 'antd-mobile-icons';

const KaeruButton = (): ReactElement => {
  const [data] = useState({} as KaeruType);
  const [tapped, setTapped] = useState(false);
  const onClick = () => {
    setTapped(true);
    Toast.show({ icon: 'success', content: 'コピーしました!' });
  };
  const getButton = (data: KaeruType) => {
    if (tapped) {
      return (
        <Button onClick={onClick}>
          <CheckCircleOutline />
        </Button>
      );
    }
    if (data?.count == null) {
      return (
        <Button onClick={onClick}>
          <AddCircleOutline />
        </Button>
      );
    } else {
      return (
        <Button onClick={onClick}>
          <ArrowDownCircleOutline />
        </Button>
      );
    }
  };
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (tapped) {
      timer = setTimeout(() => setTapped(false), 3000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  });
  return (
    <div className="kaeru-button">
      {getButton(data)}
      {tapped && <NoticeBar content="触ったね?" color="info" />}
    </div>
  );
};

export default memo(KaeruButton);
