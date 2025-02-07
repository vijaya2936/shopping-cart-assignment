// index.js
import Cart from './cart.js';  // Default import (use the same name as the exported class)

async function runShoppingCart() {
  const cart = new Cart();

  // Adding products to the cart
  cart.addProduct('cornflakes', 2);
  cart.addProduct('weetabix', 1);

  console.log('Cart contains:');
  console.log(cart.displayCart());

  // Calculating totals
  const subtotal = await cart.getSubtotal();
  const tax = await cart.getTax();
  const total = await cart.getTotal();

  console.log(`Subtotal = ${subtotal.toFixed(2)}`);
  console.log(`Tax = ${tax.toFixed(2)}`);
  console.log(`Total = ${total.toFixed(2)}`);
}

runShoppingCart();
