import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
        total: entity.total(),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async find(id: string): Promise<Order> {
    let orderModel;
    try {
      orderModel = await OrderModel.findOne({
        include: [{model: OrderItemModel}],
        where: {
          id,
        },
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error("Order not found");
    }

    let items = orderModel.items.map((item) =>{
      return new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity)
    });
    const order = new Order(orderModel.id, orderModel.customer_id, items);
    return order;
  }

  async findAll(): Promise<Order[]> {
    let orderModels = await OrderModel.findAll({include: [{model: OrderItemModel}]})
    return orderModels.map((orderModel) => {
      let items = orderModel.items.map((item) =>{
        return new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity)
      });
      return new Order(orderModel.id, orderModel.customer_id, items);
    });
  }

  async update(entity: Order): Promise<void> {
    await OrderModel.update(
      {
        id: entity.id,
        customer_id: entity.customerId,
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
        total: entity.total(),
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
    entity.items.forEach( async (item) => {
      await OrderItemModel.update(
        {
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        },
        {
          where: {
            id: item.id
          }
        }
      )
    });
  }
}
