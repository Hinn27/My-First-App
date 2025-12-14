// __tests__/components/ProductCard.test.js
import { render } from '@testing-library/react-native';
import React from 'react';
import ProductCard from '../../src/components/ProductCard';

// Mock the ThemeContext
jest.mock('../../src/context/ThemeContext', () => ({
  useTheme: () => ({
    theme: {
      primary: '#87CEEB',
      surface: '#FFFFFF',
      onSurface: '#000000',
    },
  }),
}));

describe('ProductCard', () => {
  const mockProduct = {
    id: 'F1',
    name: 'Test Product',
    special_ingredient: 'Test ingredient',
    prices: [{ size: 'M', price: '10000', currency: 'đ' }],
    average_rating: 4.5,
    favourite: false,
    imageIcon: '🍜',
  };

  it('renders product information correctly', () => {
    const { getByText } = render(
      <ProductCard
        item={mockProduct}
        onPress={jest.fn()}
        onFavorite={jest.fn()}
        onAddToCart={jest.fn()}
      />
    );

    expect(getByText('Test Product')).toBeTruthy();
    expect(getByText('Test ingredient')).toBeTruthy();
  });
});
