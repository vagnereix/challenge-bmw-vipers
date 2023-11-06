import { CreateOrderUseCase } from '../CreateOrderUseCase';

const createOrderSuccessSpy = jest.fn().mockResolvedValue([]);

function makeSut(createOrderSpy: jest.Mock) {
  const sut = new CreateOrderUseCase({
    create: jest.fn().mockImplementation(createOrderSpy),
    update: jest.fn(),
    delete: jest.fn(),
    getOrderById: jest.fn(),
    getCustomerOrders: jest.fn(),
  });

  return { sut };
}

describe('CreateOrderUseCase', () => {
  it('should be able to create a new order', async () => {
    const { sut } = makeSut(createOrderSuccessSpy);

    await expect(
      sut.execute({
        title: 'valid-title',
        customerId: 'valid-id',
      }),
    ).resolves.not.toThrow();

    expect(createOrderSuccessSpy).toHaveBeenCalled();
  });
});
