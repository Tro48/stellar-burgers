import { FC } from 'react';

import styles from './profile-orders.module.css';

import { OrdersList, ProfileMenu } from '@components';
import { ProfileOrdersUIProps } from './type';

export const ProfileOrdersUI: FC<ProfileOrdersUIProps> = ({ orders }) => (
  <main className={`${styles.main}`}>
    <div className={`mt-30 mr-15 ${styles.menu}`}>
      <ProfileMenu />
    </div>
    <div className={`mt-10 ${styles.orders}`}>
      {orders.length > 0 ? (
        <OrdersList orders={orders} />
      ) : (
        <p className='text text_type_main-default'>Нет заказов</p>
      )}
    </div>
  </main>
);
