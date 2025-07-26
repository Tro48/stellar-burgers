import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { feedSelectors, getFeedsAsync } from '../../services/FeedSlice';
import type { AppDispatch } from '../../services/store';

export const Feed: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
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
