import { BurgerConstructorUI } from '@ui';
import { TConstructorIngredient } from '@utils-types';
import { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
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
import { useDispatch } from '../../services/store';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const bun = useSelector(getBun);
  const ingredients = useSelector(getIngredients);
  const constructorItems = {
    bun,
    ingredients
  };
  const orderRequest = useSelector(getRequest);
  const orderModalData = useSelector(getOrderModalData);

  const onOrderClick = () => {
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
