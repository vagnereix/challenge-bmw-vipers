import { GetOrderUseCase } from '../GetOrderUseCase';

const getOrderSuccessSpy = jest.fn().mockResolvedValue([]);
const getOrderErrorSpy = jest.fn();

function makeSut(getOrdersSpy: jest.Mock) {
  const sut = new GetOrderUseCase({
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    getOrderById: jest.fn().mockImplementation(getOrdersSpy),
    getCustomerOrders: jest.fn(),
  });

  return { sut };
}

describe('GetOrderUseCase', () => {
  it('should be able to get order', async () => {
    const { sut } = makeSut(getOrderSuccessSpy);

    await expect(sut.execute('valid-id')).resolves.not.toThrow();

    expect(getOrderSuccessSpy).toHaveBeenCalled();
  });

  it('should not get a non-existent order', async () => {
    const { sut } = makeSut(getOrderErrorSpy);

    await expect(sut.execute('invalid-id')).rejects.toThrow();

    expect(getOrderErrorSpy).toHaveBeenCalled();
  });
});
