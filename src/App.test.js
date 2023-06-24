import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { render } from './test-utils';
//import CreateIngredient from './routes/CreateIngredient';
import Footer from './componets/Footer';
import PalCafe from './routes/PalCafe';


jest.mock('axios');

jest.mock('./componets/headerPaginaPrincipal', () => ({
  __esModule: true,
  default: () => <hed>Footer Component</hed>,
}));

jest.mock('./componets/Footer', () => ({
  __esModule: true,
  default: () => <footer>Footer Component</footer>,
}));
/*
jest.mock('./componets/headerPaginaPrincipal', () => {
  const useCustomerMock = jest.fn(() => ({
    customer: null,
    getSectionCustomer: jest.fn(),
    signOff: jest.fn(),
  }));

  return {
    __esModule: true,
    default: () => {
      const mockResult = useCustomerMock();
      return null;
    },
  };
});
*/

test('el componente Footer existe en PalCafe', () => {
  const { container } = render(<PalCafe />);
  const footerComponent = container.querySelector('Footer');

  expect(footerComponent).toBeInTheDocument();
});




