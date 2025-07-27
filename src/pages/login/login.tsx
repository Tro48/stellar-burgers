import { LoginUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getError, loginAsync } from '../../services/UserSlice';
import { AppDispatch } from '../../services/store';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errorAuth = useSelector(getError);
  const [errorText, setErrorText] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    setEmail(form.email.value);
    setPassword(form.password.value);
    dispatch(loginAsync({ email, password }));
  };

  useEffect(() => {
    switch (errorAuth) {
      case null:
        setErrorText('');
        break;
      case 'No access token found':
        setErrorText('');
        break;
      case 'Token is invalid':
        setErrorText('Сессия истекла, пожалуйста, войдите снова');
        break;
      case 'email or password are incorrect':
        setErrorText('Некорректный email или пароль');
        break;
      default:
        setErrorText('Произошла ошибка при входе');
    }
  }, [errorAuth]);

  return (
    <LoginUI
      errorText={errorText}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
