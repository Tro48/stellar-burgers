import { BurgerConstructorElementUI } from '@ui';
import { FC, memo } from 'react';
import { useDispatch } from '../../services/store';
import { constructorActions } from '../../services/ConstructorSlice';
import { BurgerConstructorElementProps } from './type';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();
    const handleMoveDown = () => {
      dispatch(constructorActions.downIngridient(ingredient));
    };

    const handleMoveUp = () => {
      dispatch(constructorActions.upIngridient(ingredient));
    };

    const handleClose = () => {
      dispatch(constructorActions.removeIngridient(ingredient));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
