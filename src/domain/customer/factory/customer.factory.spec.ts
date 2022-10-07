import CustomerFactory from "./customer.factory";
import Address from "../value-object/address";
import EnviaConsoleLog1Handler from "../event/handler/envia_console_log1.handler";
import EnviaConsoleLog2Handler from "../event/handler/envia_console_log2.handler";

describe("Customer factory unit test", () => {
  it("should create a customer", () => {
    const eventHandler1 = new EnviaConsoleLog1Handler()
    const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
    
    const eventHandler2 = new EnviaConsoleLog2Handler()
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");
    CustomerFactory.addEventHandler("CustomerCreatedEvent", eventHandler1);
    CustomerFactory.addEventHandler("CustomerCreatedEvent", eventHandler2);
    
    let customer = CustomerFactory.create("John");
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John");
    expect(customer.Address).toBeUndefined();
    expect(spyEventHandler1).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
  });

  it("should create a customer with an address", () => {
    const address = new Address("Street", 1, "13330-250", "São Paulo");

    const eventHandler1 = new EnviaConsoleLog1Handler()
    const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
    
    const eventHandler2 = new EnviaConsoleLog2Handler()
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");
    CustomerFactory.addEventHandler("CustomerCreatedEvent", eventHandler1);
    CustomerFactory.addEventHandler("CustomerCreatedEvent", eventHandler2);
    
    let customer = CustomerFactory.createWithAddress("John", address);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John");
    expect(customer.Address).toBe(address);

    expect(spyEventHandler1).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
  });
});
