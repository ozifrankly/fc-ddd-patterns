import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerCreatedEvent from  "../customer-created.event"

export default class EnviaConsoleLogHandler implements EventHandlerInterface<CustomerCreatedEvent>{
  handle(event: CustomerCreatedEvent): void {
    let customer = event.eventData;
    console.log(`Endereço do cliente: ${customer.id}, ${customer.name} alterado para: ${customer.Address.toString()}`)
  }
}