import { DeleteOrderUseCase } from '../DeleteOrderUseCase';

const deleteOrderSuccessSpy = jest.fn().mockResolvedValue([]);

function makeSut(deleteOrderSpy: jest.Mock) {
  const sut = new DeleteOrderUseCase({
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn().mockImplementation(deleteOrderSpy),
    getOrderById: jest.fn(),
    getCustomerOrders: jest.fn(),
  });

  return { sut };
}

describe('DeleteOrderUseCase', () => {
  it('should be able to delete order', async () => {
    const { sut } = makeSut(deleteOrderSuccessSpy);

    await expect(sut.execute('valid-id')).resolves.not.toThrow();

    expect(deleteOrderSuccessSpy).toHaveBeenCalled();
  });
});
