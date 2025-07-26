import { FC } from 'react';

import { TOrder } from '@utils-types';
import { useSelector } from 'react-redux';
import { feedSelectors } from '../../services/FeedSlice';
import { FeedInfoUI } from '../ui/feed-info';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders: TOrder[] = useSelector(feedSelectors.getOrders);
  const total = useSelector(feedSelectors.getTotal);
  const totalToday = useSelector(feedSelectors.getTotalToday);
  const feed = { total, totalToday };

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
