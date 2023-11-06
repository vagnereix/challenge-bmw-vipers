import { CreateCustomerUseCase } from '../CreateCustomerUseCase';

const getCustomerSuccessSpy = jest.fn().mockResolvedValue({
  id: 'valid-id',
  name: 'User',
  email: 'used.email@gmail.com',
});

const createCustomerSuccessSpy = jest.fn().mockResolvedValue({
  id: 'valid-id',
  name: 'Vagner',
  email: 'vagnereix.dev@gmail.com',
});

const createCustomerErrorSpy = jest.fn().mockRejectedValue(null);

function makeSut(createCustomerSpy: jest.Mock, getCustomerSpy?: jest.Mock) {
  const sut = new CreateCustomerUseCase({
    create: jest.fn().mockImplementation(createCustomerSpy),
    getCustomerByEmail: jest.fn().mockImplementation(getCustomerSpy),
  });

  return { sut };
}

describe('GetCustomerUseCase', () => {
  it('should be able to create a new customer', async () => {
    const { sut } = makeSut(createCustomerSuccessSpy);

    await expect(
      sut.execute({
        name: 'Vagner',
        email: 'vagnereix.dev@gmail.com',
      }),
    ).resolves.not.toThrow();

    expect(createCustomerSuccessSpy).toHaveBeenCalled();
  });

  it('should not be able to create a new customer with a used email', async () => {
    const { sut } = makeSut(createCustomerErrorSpy, getCustomerSuccessSpy);

    await expect(
      sut.execute({
        name: 'Vagner',
        email: 'used.email@gmail.com',
      }),
    ).rejects.toThrow();
  });
});
