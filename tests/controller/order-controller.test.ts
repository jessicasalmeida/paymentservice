import { OrderUseCase } from '../../src/core/usercases/order-use-case';
import { CartItensDTO, ItensDTO, NewOrderDTO, OrderDTO, ProductDTO } from '../../src/common/dtos/order.dto';
import { OrderController } from '../../src/operation/controllers/order-controller';
import { OrderPresenter } from '../../src/operation/presenters/order';

// Mock OrderGateway
jest.mock('../../src/core/usercases/order-use-case');

describe('OrderController', () => {
    const mockOrderUseCase = OrderUseCase as jest.Mocked<typeof OrderUseCase>;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should receive order', async () => {
        const date = new Date();
        const mockProductDTO: ProductDTO = {id: "0", name: "",  options: "", price:0, timeToPrepare:15, category: "", status: true};
        const mockItensDTO: ItensDTO[] = [{id: 0, options: "", price: 0, product: mockProductDTO}];
        const mockCartItens: CartItensDTO = {id : "0", user: "", totalValue: 0, status: "New", payment:true, estimatedTime: 15, cartItens: mockItensDTO};
        const mockNewOrder: NewOrderDTO = { receiveDate: date, deliveryTime:15, status: "New", cart: mockCartItens};
        const mockOrder: OrderDTO = {id: "0", receiveDate: date, deliveryTime: 15, status: "New", cart: mockCartItens};
        mockOrderUseCase.receiveOrder.mockResolvedValueOnce(mockOrder);

        const result = await OrderController.receiveOrder(mockNewOrder, {} as any);

        expect(result).toEqual(OrderPresenter.toDTO(mockOrder));
    });

    it('should prepare order', async () => {
        const mockOrderId = '0'; 
        const date = new Date();
        const mockProductDTO: ProductDTO = {id: "0", name: "",  options: "", price:0, timeToPrepare:15, category: "", status: true};
        const mockItensDTO: ItensDTO[] = [{id: 0, options: "", price: 0, product: mockProductDTO}];
        const mockCartItens: CartItensDTO = {id : "", user: "", totalValue: 0, status: "New", payment:true, estimatedTime: 15, cartItens: mockItensDTO};
        const mockOrder: OrderDTO = {id: "", receiveDate: date, deliveryTime: 15, status: "PREPARING", cart: mockCartItens};
       
        mockOrderUseCase.prepareOrder.mockResolvedValueOnce(mockOrder);

        const result = await OrderController.prepareOrder(mockOrderId, {} as any);

        expect(result).toEqual(OrderPresenter.toDTO(mockOrder));
    });

    it('should estimate delivery', async () => {
        const mockOrderId = '0'; 
        const mockOrder = "The estimate time to order is ready is 15";
        mockOrderUseCase.estimateDelivery.mockResolvedValueOnce(mockOrder);

        const result = await OrderController.estimateDelivery(mockOrderId, {} as any);

        expect(result).toEqual(mockOrder);
    });

    it('should update status to ready', async () => {
        const mockOrderId = '0'; 
        const mockOrder = "The order is ready to delivery";
        mockOrderUseCase.updateStatusToReady.mockResolvedValueOnce(mockOrder);

        const result = await OrderController.updateStatusToReady(mockOrderId, {} as any);

        expect(result).toEqual(mockOrder);
    });

    it('should update status to delivered', async () => {
        const mockOrderId = '0'; 
        const date = new Date();
        const mockProductDTO: ProductDTO = {id: "0", name: "",  options: "", price:0, timeToPrepare:15, category: "", status: true};
        const mockItensDTO: ItensDTO[] = [{id: 0, options: "", price: 0, product: mockProductDTO}];
        const mockCartItens: CartItensDTO = {id : "", user: "", totalValue: 0, status: "New", payment:true, estimatedTime: 15, cartItens: mockItensDTO};
        const mockOrder: OrderDTO = {id: "", receiveDate: date, deliveryTime: 15, status: "READY", cart: mockCartItens};
       
        mockOrderUseCase.updateStatusToDelivered.mockResolvedValueOnce(mockOrder);

        const result = await OrderController.updateStatusToDelivered(mockOrderId, {} as any);

        expect(result).toEqual(mockOrder);
    });

    it('should update status to closed', async () => {
        const mockOrderId = '0'; 
        const date = new Date();
        const mockProductDTO: ProductDTO = {id: "0", name: "",  options: "", price:0, timeToPrepare:15, category: "", status: true};
        const mockItensDTO: ItensDTO[] = [{id: 0, options: "", price: 0, product: mockProductDTO}];
        const mockCartItens: CartItensDTO = {id : "", user: "", totalValue: 0, status: "New", payment:true, estimatedTime: 15, cartItens: mockItensDTO};
        const mockOrder: OrderDTO = {id: "", receiveDate: date, deliveryTime: 15, status: "DELIVERED", cart: mockCartItens};
       
        mockOrderUseCase.updateStatusToClosed.mockResolvedValueOnce(mockOrder);

        const result = await OrderController.updateStatusToClosed(mockOrderId, {} as any);

        expect(result).toEqual(mockOrder);
    });

    it('should get all active orders', async () => {
        const date = new Date();
        const mockProductDTO: ProductDTO = {id: "0", name: "",  options: "", price:0, timeToPrepare:15, category: "", status: true};
        const mockItensDTO: ItensDTO[] = [{id: 0, options: "", price: 0, product: mockProductDTO}];
        const mockCartItens: CartItensDTO = {id : "", user: "", totalValue: 0, status: "New", payment:true, estimatedTime: 15, cartItens: mockItensDTO};
        const mockOrders: OrderDTO[] = [{id: "", receiveDate: date, deliveryTime: 15, status: "PREPARING", cart: mockCartItens}];
       
        mockOrderUseCase.getAllActiveOrders.mockResolvedValueOnce(mockOrders);

        const result = await OrderController.getAllActiveOrders({} as any);

        expect(result).toEqual(mockOrders);
    });

});
