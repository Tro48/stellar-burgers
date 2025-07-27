import { ProfileMenuUI } from '@ui';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { logoutUserAsync } from '../../services/UserSlice';
import { AppDispatch } from '../../services/store';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logoutUserAsync());
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
