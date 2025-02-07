// cart.js
import fetch from 'node-fetch'; // Import node-fetch for fetch functionality in Node.js

class Cart {
  constructor() {
    this.items = [];
  }

  // Add a product to the cart
  addProduct(name, quantity) {
    this.items.push({ name, quantity });
  }

  // Retrieve the price for a given product from the API
  async getProductPrice(name) {
    const response = await fetch(`http://localhost:3001/products/${name}`);
    if (!response.ok) throw new Error('Product not found');
    const data = await response.json();
    return data.price;
  }

  // Get the subtotal for all items in the cart
  async getSubtotal() {
    let subtotal = 0;
    for (const item of this.items) {
      const price = await this.getProductPrice(item.name);
      subtotal += price * item.quantity;
    }
    return subtotal;
  }

  // Calculate the tax (12.5% of the subtotal)
  async getTax() {
    const subtotal = await this.getSubtotal();
    return Math.round(subtotal * 0.125 * 100) / 100; // rounding to 2 decimal places
  }

  // Calculate the total (subtotal + tax)
  async getTotal() {
    const subtotal = await this.getSubtotal();
    const tax = await this.getTax();
    return Math.round((subtotal + tax) * 100) / 100; // rounding to 2 decimal places
  }

  // Display the cart
  displayCart() {
    let displayString = '';
    this.items.forEach(item => {
      displayString += `${item.quantity} x ${item.name}\n`;
    });
    return displayString;
  }
}

export default Cart;  // Default export
