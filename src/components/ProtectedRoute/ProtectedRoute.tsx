import { Preloader } from '@ui';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { AppDispatch } from 'src/services/store';
import {
  checkAuthAsync,
  getIsAuth,
  getLoading,
  getUser
} from '../../services/UserSlice';

type ProtectedRouteProps = {
  children: React.ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({
  children,
  onlyUnAuth
}: ProtectedRouteProps) => {
  const isAuth = useSelector(getIsAuth);
  const isLoading = useSelector(getLoading);
  const user = useSelector(getUser);
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!isAuth) {
      dispatch(checkAuthAsync());
    }
  }, [dispatch, isAuth]);

  if (isLoading) {
    return <Preloader />;
  }
  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }
  if (onlyUnAuth && user) {
    return <Navigate to={location.state?.from || { pathname: '/' }} />;
  }

  return children;
};
