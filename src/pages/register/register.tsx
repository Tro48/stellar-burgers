import { RegisterUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../services/store';
import { getError, registerUserAsync } from '../../services/UserSlice';

export const Register: FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const [errorText, setErrorText] = useState('');
  const errorAuth = useSelector(getError);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    setName((form.name as unknown as HTMLInputElement).value);
    setEmail(form.email.value);
    setPassword(form.password.value);
    dispatch(registerUserAsync({ name, email, password }));
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
        setErrorText('');
        break;
      case 'User already exists':
        setErrorText('Пользователь с таким email уже существует');
        break;
      default:
        setErrorText('Произошла ошибка при регистрации');
    }
  }, [errorAuth]);

  return (
    <RegisterUI
      errorText={errorText}
      email={email}
      userName={name}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setName}
      handleSubmit={handleSubmit}
    />
  );
};
