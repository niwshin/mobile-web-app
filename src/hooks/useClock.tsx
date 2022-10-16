import { DependencyList, useEffect, useState } from 'react';
import dayjs from 'dayjs';

type UseClockOptions = {
  interval?: number;
  current?: dayjs.Dayjs;
  lastRefreshAt?: dayjs.Dayjs;
};
/**
 * get dayjs object
 */
const useClock = (options?: UseClockOptions, deps?: DependencyList) => {
  type MaybeDayjs = dayjs.Dayjs | undefined;
  const [now, setNow] = useState<MaybeDayjs>();
  useEffect(() => {
    const { interval, current, lastRefreshAt } = options || {};
    let dayjsInstance: MaybeDayjs;
    if (current != null && lastRefreshAt) {
      // timeDiff := lastRefresh - clientNow
      // now = current + timediff
      const refreshDiff = dayjs().diff(lastRefreshAt);
      dayjsInstance = current.add(refreshDiff, 'ms');
    } else {
      dayjsInstance = dayjs();
    }
    const timer = setTimeout(() => setNow(dayjsInstance), interval || 250);
    return () => clearTimeout(timer);
  }, [now, deps]);
  return now;
};

export default useClock;
