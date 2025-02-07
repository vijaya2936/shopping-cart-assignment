// tests/cart.test.js

import Cart from '../cart.js';

describe('Shopping Cart', () => {
  let cart;

  beforeEach(() => {
    cart = new Cart();
  });

  test('should add product to the cart', () => {
    cart.addProduct('cornflakes', 2);
    expect(cart.items).toHaveLength(1);
    expect(cart.items[0]).toEqual({ name: 'cornflakes', quantity: 2 });
  });

  test('should calculate subtotal', async () => {
    cart.addProduct('cornflakes', 2);
    cart.addProduct('weetabix', 1);

    // Mocking the API call
    global.fetch = jest.fn((url) =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            price: url.includes('cornflakes') ? 2.52 : 9.98,
          }),
      })
    );

    const subtotal = await cart.getSubtotal();
    expect(subtotal).toBeCloseTo(15.02, 2);
  });

  test('should calculate tax', async () => {
    cart.addProduct('cornflakes', 2);
    cart.addProduct('weetabix', 1);

    global.fetch = jest.fn((url) =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            price: url.includes('cornflakes') ? 2.52 : 9.98,
          }),
      })
    );

    const tax = await cart.getTax();
    expect(tax).toBeCloseTo(1.88, 2);
  });

  test('should calculate total', async () => {
    cart.addProduct('cornflakes', 2);
    cart.addProduct('weetabix', 1);

    global.fetch = jest.fn((url) =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            price: url.includes('cornflakes') ? 2.52 : 9.98,
          }),
      })
    );

    const total = await cart.getTotal();
    expect(total).toBeCloseTo(16.90, 2);
  });
});
