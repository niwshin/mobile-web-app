import React, { memo } from 'react';
import Clock from './Clock';
import DemoBlock from './DemoBlock';
import KaeruButton from './KaeruButton';

const Contents = () => {
  return (
    <>
      <DemoBlock title="ボタンが変わるよ">
        <KaeruButton />
      </DemoBlock>
      <DemoBlock title="時計">
        <Clock />
      </DemoBlock>
    </>
  );
};

export default memo(Contents);
