import Customer from "../entity/customer";
import { v4 as uuid } from "uuid";
import Address from "../value-object/address";
import EventDispatcherInterface from "../../@shared/event/event-dispatcher"
import EventHandlerInterface from "../../@shared/event/event-handler.interface";
import EventInterface from "../../@shared/event/event.interface";
import CustomerCreatedEvent from "../event/customer-created.event";

export default class CustomerFactory {
  static dispatcher: EventDispatcherInterface = new EventDispatcherInterface();
  public static create(name: string): Customer {
    const customer = new Customer(uuid(), name)
    const event = new CustomerCreatedEvent(customer);
    this.dispatcher.notify(event);
    return customer;
  }

  public static createWithAddress(name: string, address: Address): Customer {
    const customer = new Customer(uuid(), name);
    customer.changeAddress(address);
    const event = new CustomerCreatedEvent(customer);
    this.dispatcher.notify(event);
    return customer;
  }

  public static addEventHandler(event: string, handler: EventHandlerInterface<EventInterface>){
    this.dispatcher.register(event, handler)
  }

  public static removeEventHandler(event: string, handler: EventHandlerInterface<EventInterface>){
    this.dispatcher.register(event, handler)
  }
}
