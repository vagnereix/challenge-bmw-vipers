import { UpdateOrderUseCase } from '../UpdateOrderUseCase';

const updateOrderSuccessSpy = jest.fn().mockResolvedValue([]);
const updateOrderErrorSpy = jest.fn();

function makeSut(updateOrderSpy: jest.Mock) {
  const sut = new UpdateOrderUseCase({
    create: jest.fn(),
    update: jest.fn().mockImplementation(updateOrderSpy),
    delete: jest.fn(),
    getOrderById: jest.fn(),
    getCustomerOrders: jest.fn(),
  });

  return { sut };
}

describe('CreateOrderUseCase', () => {
  it('should be able to update order', async () => {
    const { sut } = makeSut(updateOrderSuccessSpy);

    await expect(
      sut.execute({
        id: 'valid-id',
        title: 'valid-title',
        customerId: 'valid-id',
      }),
    ).resolves.not.toThrow();

    expect(updateOrderSuccessSpy).toHaveBeenCalled();
  });

  it('should not update a non-existent order', async () => {
    const { sut } = makeSut(updateOrderErrorSpy);

    await expect(
      sut.execute({
        id: 'invalid-id',
        title: 'valid-title',
        customerId: 'valid-id',
      }),
    ).rejects.toThrow();

    expect(updateOrderSuccessSpy).toHaveBeenCalled();
  });
});
