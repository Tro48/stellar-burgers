import { BurgerConstructorUI } from '@ui';
import { TConstructorIngredient } from '@utils-types';
import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  constructorActions,
  getBun,
  getIngredients
} from '../../services/ConstructorSlice';
import {
  createOrderAsync,
  getOrderModalData,
  getRequest,
  orderActions
} from '../../services/OrderSlice';
import { useDispatch, useSelector } from '../../services/store';
import { getIsAuth } from '../../services/UserSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const bun = useSelector(getBun);
  const ingredients = useSelector(getIngredients);
  const isAuth = useSelector(getIsAuth);
  const constructorItems = {
    bun,
    ingredients
  };
  const orderRequest = useSelector(getRequest);
  const orderModalData = useSelector(getOrderModalData);
  const nav = useNavigate();

  const onOrderClick = () => {
    if (!isAuth) return nav('/login');
    if (!constructorItems.bun || orderRequest) return;
    const ingredientsIds = [
      ...constructorItems.ingredients.map((ingredient) => ingredient._id),
      constructorItems.bun._id
    ];
    dispatch(createOrderAsync(ingredientsIds));
  };
  const closeOrderModal = () => {
    dispatch(constructorActions.clearConstructor());
    dispatch(orderActions.clearOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );
  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
