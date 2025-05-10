
// Product data for Telegram bot implementation

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  available: boolean;
}

export const products: Product[] = [
  {
    id: "P001",
    name: "Bluetooth Speaker",
    description: "Portable, rechargeable Bluetooth speaker with FM radio.",
    price: 950,
    available: true,
  },
  {
    id: "P002",
    name: "Wireless Earbuds",
    description: "TWS earbuds with touch control and noise cancellation.",
    price: 1200,
    available: true,
  },
  {
    id: "P003",
    name: "Power Bank",
    description: "20000mAh fast charging power bank with dual USB ports.",
    price: 750,
    available: false,
  },
  {
    id: "P004",
    name: "USB Flash Drive",
    description: "64GB USB 3.0 flash drive with metal casing.",
    price: 450,
    available: true,
  },
  {
    id: "P005",
    name: "Smartphone Case",
    description: "Premium silicone case with shockproof protection.",
    price: 350,
    available: true,
  },
  {
    id: "P006", 
    name: "HDMI Cable",
    description: "2m high-speed HDMI cable with gold-plated connectors.",
    price: 280,
    available: true,
  },
  {
    id: "P007",
    name: "Gaming Mouse",
    description: "RGB gaming mouse with 6 programmable buttons.",
    price: 850,
    available: true,
  }
];

// Telegram Bot Implementation Code
/*
To implement this as a real Telegram bot, you would need:

1. Create a new Node.js project:
   mkdir telegram-eticket-bot
   cd telegram-eticket-bot
   npm init -y

2. Install required packages:
   npm install telegraf dotenv

3. Create a .env file with your bot token:
   TELEGRAM_BOT_TOKEN=your_bot_token_from_botfather

4. Create index.js with this code:

const { Telegraf } = require('telegraf');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize bot with token from BotFather
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// Import products data (can be moved to a database later)
const products = [
  // Copy the products array from above
];

// Track user states
const userStates = {};

// Welcome message
bot.start((ctx) => {
  ctx.reply(
    '👋 Welcome to E-Ticketing!\nOrder your favorite products easily via Telegram.', 
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: '🔰 Start Order', callback_data: 'start_order' }]
        ]
      }
    }
  );
});

// Start order button handler
bot.action('start_order', (ctx) => {
  userStates[ctx.from.id] = { state: 'askProductId' };
  ctx.reply('🛍️ Please enter the Product ID to see details:\n(Example: P001)');
});

// Handle text messages based on user state
bot.on('text', (ctx) => {
  const userId = ctx.from.id;
  const userMessage = ctx.message.text;
  const userState = userStates[userId]?.state || 'welcome';

  switch (userState) {
    case 'askProductId':
      const product = products.find(p => 
        p.id.toLowerCase() === userMessage.toLowerCase()
      );

      if (!product) {
        ctx.reply('⚠️ Invalid Product ID. Please try again.');
      } else {
        userStates[userId] = { 
          state: 'askAddress',
          product: product 
        };
        ctx.reply(
          `✅ Product Found:\n\n📦 Name: ${product.name}\n🆔 ID: ${product.id}\n💰 Price: ${product.price} BDT\n📄 Description: ${product.description}\n\n📲 Pay using:\n- 🟣 Bkash: 01XXXXXXXXX\n- 🔵 Nagad: 01YYYYYYYYY`
        );
        ctx.reply('📬 Please enter your delivery address to confirm the order:');
      }
      break;

    case 'askAddress':
      if (userMessage.length < 10) {
        ctx.reply('⚠️ Your address seems incomplete. Please include area and district.');
      } else {
        const product = userStates[userId].product;
        userStates[userId] = { state: 'orderConfirmation' };
        ctx.reply(
          `✅ Your order has been placed successfully!\n\n📦 Product: ${product.name} (${product.id})\n💰 Amount: ${product.price} BDT\n🏠 Delivery Address: ${userMessage}\n📲 Payment Number: 01XXXXXXXXX (Bkash/Nagad)\n\n🕐 Please complete payment and wait for confirmation.\n📞 We will contact you soon. Thank you!`
        );
        ctx.reply('Would you like to order something else? Type \'Yes\' to start again.');
      }
      break;

    case 'orderConfirmation':
      if (userMessage.toLowerCase() === 'yes') {
        userStates[userId] = { state: 'askProductId' };
        ctx.reply('🛍️ Please enter the Product ID to see details:\n(Example: P001)');
      } else {
        ctx.reply('Thank you for using E-Ticketing! We hope to see you again soon.');
      }
      break;

    default:
      ctx.reply(
        '👋 Welcome to E-Ticketing!\nOrder your favorite products easily via Telegram.',
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: '🔰 Start Order', callback_data: 'start_order' }]
            ]
          }
        }
      );
  }
});

// Start the bot
bot.launch().then(() => {
  console.log('Bot is running!');
});

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

5. Run your bot:
   node index.js

6. Deploy to a hosting service like Heroku, Railway, or DigitalOcean
*/
