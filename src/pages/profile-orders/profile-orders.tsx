import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { getOrdersUser, getOrdersUserAsync } from '../../services/OrderSlice';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(getOrdersUser);

  useEffect(() => {
    dispatch(getOrdersUserAsync());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
