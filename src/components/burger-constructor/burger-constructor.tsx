import { BurgerConstructorUI } from '@ui';
import { TConstructorIngredient } from '@utils-types';
import { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getBun, getIngredients } from '../../services/ConstructorSlice';
import { getOrderModalData, getRequest } from '../../services/OrderSlice';

export const BurgerConstructor: FC = () => {
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
  };
  const closeOrderModal = () => {};

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
