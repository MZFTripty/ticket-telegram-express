
import express from 'express';
import { products } from '../data/products';
import { OrderService } from './orderService';

const router = express.Router();
const orderService = new OrderService();

// GET /api/products - Get all products
router.get('/products', (req, res) => {
  res.json(products);
});

// GET /api/products/:id - Get a specific product
router.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  res.json(product);
});

// POST /api/orders - Place a new order
router.post('/orders', (req, res) => {
  const { productId, address, customerName, phoneNumber } = req.body;
  
  // Validation
  if (!productId || !address || !customerName || !phoneNumber) {
    return res.status(400).json({ 
      error: 'Missing required fields: productId, address, customerName, phoneNumber' 
    });
  }
  
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  if (!product.available) {
    return res.status(400).json({ error: 'Product is not available' });
  }

  // Create and store the order
  const order = orderService.createOrder(product, address, customerName, phoneNumber);
  
  res.status(201).json(order);
});

// GET /api/orders/:id - Get order status
router.get('/orders/:id', (req, res) => {
  const order = orderService.getOrder(req.params.id);
  
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  
  res.json(order);
});

export default router;
