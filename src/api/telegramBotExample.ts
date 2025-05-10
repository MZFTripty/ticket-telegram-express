
// This is an example of how to use the API with a Telegram bot
// You would implement this in a separate Node.js project

import axios from 'axios';

// Base URL for API requests
const API_BASE_URL = 'http://localhost:3000/api';

// Example function to check product availability
async function checkProductAvailability(productId: string) {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

// Example function to place an order
async function placeOrder(productId: string, address: string, customerName: string, phoneNumber: string) {
  try {
    const response = await axios.post(`${API_BASE_URL}/orders`, {
      productId,
      address,
      customerName,
      phoneNumber
    });
    return response.data;
  } catch (error) {
    console.error('Error placing order:', error);
    return null;
  }
}

// Example function to check order status
async function checkOrderStatus(orderId: string) {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error('Error checking order status:', error);
    return null;
  }
}

/*
How to use these functions with a Telegram bot:

const { Telegraf } = require('telegraf');
const bot = new Telegraf('YOUR_BOT_TOKEN');

// Example: When user asks for product info
bot.command('product', async (ctx) => {
  const productId = ctx.message.text.split(' ')[1];
  if (!productId) {
    return ctx.reply('Please provide a product ID, e.g., /product P001');
  }
  
  const product = await checkProductAvailability(productId);
  
  if (!product) {
    return ctx.reply('Product not found or error occurred.');
  }
  
  const availabilityStatus = product.available ? '✅ In Stock' : '❌ Out of Stock';
  
  ctx.reply(
    `Product: ${product.name}\n` +
    `ID: ${product.id}\n` +
    `Price: ${product.price} BDT\n` +
    `Description: ${product.description}\n` +
    `Status: ${availabilityStatus}`
  );
});

// Example: When placing an order
bot.action('place_order', (ctx) => {
  // Get user data from context or previous conversation
  const { productId, address, name, phone } = getUserData(ctx);
  
  placeOrder(productId, address, name, phone)
    .then(order => {
      if (order) {
        ctx.reply(`✅ Order placed successfully!\nOrder ID: ${order.id}`);
      } else {
        ctx.reply('❌ Failed to place order. Please try again later.');
      }
    });
});
*/

export { checkProductAvailability, placeOrder, checkOrderStatus };
