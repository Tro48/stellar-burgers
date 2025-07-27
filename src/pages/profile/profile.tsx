import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, updateUserDataAsync } from '../../services/UserSlice';
import { AppDispatch } from '../../services/store';

export const Profile: FC = () => {
  const user = useSelector(getUser);
  const dispatch = useDispatch<AppDispatch>();
  const initFormValue = {
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  };

  const [formValue, setFormValue] = useState(initFormValue);

  useLayoutEffect(() => {
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateUserDataAsync(formValue));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue(initFormValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );

  return null;
};
