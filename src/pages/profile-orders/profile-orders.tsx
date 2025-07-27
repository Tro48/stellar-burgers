import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrdersUser, getOrdersUserAsync } from '../../services/OrderSlice';
import { AppDispatch } from '../../services/store';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector(getOrdersUser);

  useEffect(() => {
    dispatch(getOrdersUserAsync());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
