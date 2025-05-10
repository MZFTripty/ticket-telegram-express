
import { Product } from '../data/products';

export interface Order {
  id: string;
  product: Product;
  address: string;
  customerName: string;
  phoneNumber: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  createdAt: Date;
}

export class OrderService {
  private orders: Map<string, Order> = new Map();
  private orderCounter: number = 0;

  createOrder(product: Product, address: string, customerName: string, phoneNumber: string): Order {
    this.orderCounter++;
    const id = `ORD${this.orderCounter.toString().padStart(4, '0')}`;
    
    const order: Order = {
      id,
      product,
      address,
      customerName,
      phoneNumber,
      status: 'pending',
      createdAt: new Date()
    };
    
    this.orders.set(id, order);
    console.log(`New order created: ${id} for ${product.name}`);
    return order;
  }

  getOrder(id: string): Order | undefined {
    return this.orders.get(id);
  }

  getAllOrders(): Order[] {
    return Array.from(this.orders.values());
  }

  updateOrderStatus(id: string, status: 'pending' | 'confirmed' | 'shipped' | 'delivered'): Order | undefined {
    const order = this.orders.get(id);
    
    if (order) {
      order.status = status;
      this.orders.set(id, order);
    }
    
    return order;
  }
}
