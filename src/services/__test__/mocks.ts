import { TConstructorIngredient, TIngredient } from '@utils-types';

export const bunMock = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  __v: 0
};

export const ingredientMock: TConstructorIngredient = {
  _id: '643d69a5c3f7b9001cfa093f',
  name: 'Мясо бессмертных моллюсков Protostomia',
  type: 'main',
  proteins: 433,
  fat: 244,
  carbohydrates: 33,
  calories: 420,
  price: 1337,
  image: 'https://code.s3.yandex.net/react/code/meat-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
  id: 'testId'
};

export const sauceMock: TConstructorIngredient = {
  _id: '643d69a5c3f7b9001cfa0943',
  name: 'Соус фирменный Space Sauce',
  type: 'sauce',
  proteins: 50,
  fat: 22,
  carbohydrates: 11,
  calories: 14,
  price: 80,
  image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
  id: 'testId_sauce'
};

export const userOrdersMock = {
  success: true,
  orders: [
    {
      _id: '68a05f53673086001ba8315c',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa0945',
        '643d69a5c3f7b9001cfa0942'
      ],
      owner: '68a177af673086001ba833d5',
      status: 'done',
      name: 'Антарианский краторный spicy био-марсианский метеоритный бургер',
      createdAt: '2025-08-16T10:37:07.545Z',
      updatedAt: '2025-08-16T10:37:08.432Z',
      number: 86639,
      __v: 0
    }
  ],
  total: 86311,
  totalToday: 53
};

export const ingredientsDataMock: TIngredient[] = [
  bunMock,
  ingredientMock,
  sauceMock
];

export const createOrderMock = {
  success: true,
  name: 'Антарианский краторный spicy био-марсианский метеоритный бургер',
  order: {
    ingredients: [
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa0940',
      '643d69a5c3f7b9001cfa0945',
      '643d69a5c3f7b9001cfa0942'
    ],
    _id: '68a05f53673086001ba8315c',
    owner: {
      name: 'nameMock',
      email: 'emailmock@test.com',
      createdAt: '2025-08-16T10:18:52.718Z',
      updatedAt: '2025-08-16T10:18:52.718Z'
    },
    status: 'done',
    name: 'Антарианский краторный spicy био-марсианский метеоритный бургер',
    createdAt: '2025-08-16T10:37:07.545Z',
    updatedAt: '2025-08-16T10:37:08.432Z',
    number: 86639,
    price: 4857
  }
};

export const orderIdsMock = [
  '643d69a5c3f7b9001cfa093c',
  '643d69a5c3f7b9001cfa0941',
  '643d69a5c3f7b9001cfa0940',
  '643d69a5c3f7b9001cfa0945',
  '643d69a5c3f7b9001cfa0942'
];

export const orderResponceMock = {
  success: true,
  orders: [
    {
      _id: '68a05f53673086001ba8315c',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa0945',
        '643d69a5c3f7b9001cfa0942'
      ],
      owner: '68a177af673086001ba833d5',
      status: 'done',
      name: 'Антарианский краторный spicy био-марсианский метеоритный бургер',
      createdAt: '2025-08-16T10:37:07.545Z',
      updatedAt: '2025-08-16T10:37:08.432Z',
      number: 86639,
      __v: 0
    }
  ]
};

export const orderNumberMock = 86639;

export const userMock = {
  email: 'emailMock@test.com',
  name: 'nameMock'
};

export const registerDataMock = {
  email: 'emailMock@test.com',
  name: 'nameMock',
  password: '1234'
};

export const loginDataMock = {
  email: 'emailMock@test.com',
  password: '1234'
};
