import { GetCustomerOrdersUseCase } from '../GetCustomerOrdersUseCase';

const getCustomerOrdersSuccessSpy = jest.fn().mockResolvedValue([]);

const getCustomerOrdersErrorSpy = jest.fn();

function makeSut(getCustomerOrdersSpy: jest.Mock) {
  const sut = new GetCustomerOrdersUseCase({
    create: jest.fn(),
    getCustomerByEmail: jest.fn(),
    getCustomerOrders: jest.fn().mockImplementation(getCustomerOrdersSpy),
  });

  return { sut };
}

describe('GetCustomerOrdersUseCase', () => {
  it('should be able to get all customer orders', async () => {
    const { sut } = makeSut(getCustomerOrdersSuccessSpy);

    await expect(sut.execute('valid-id')).resolves.not.toThrow();

    expect(getCustomerOrdersSuccessSpy).toHaveBeenCalled();
  });

  it('should not be able to get customer orders', async () => {
    const { sut } = makeSut(getCustomerOrdersErrorSpy);

    await expect(sut.execute('valid-id')).rejects.toThrow();

    expect(getCustomerOrdersErrorSpy).toHaveBeenCalled();
  });
});
