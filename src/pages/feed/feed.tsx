import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { feedSelectors, getFeedsAsync } from '../../services/FeedSlice';
import { useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(feedSelectors.getOrders);
  const loading = useSelector(feedSelectors.getLoading);

  const getFeeds = () => {
    dispatch(getFeedsAsync());
  };

  useEffect(() => {
    getFeeds();
  }, [dispatch]);

  if (loading) {
    return <Preloader />;
  }
  return <FeedUI orders={orders} handleGetFeeds={getFeeds} />;
};
