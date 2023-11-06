import { GetCustomerUseCase } from '../GetCustomerUseCase';

const getCustomerSuccessSpy = jest.fn().mockResolvedValue({
  id: 'valid-id',
  name: 'Vagner',
  email: 'vagnereix.dev@gmail.com',
});

const getCustomerErrorSpy = jest.fn();

function makeSut(getCustomerSpy: jest.Mock) {
  const sut = new GetCustomerUseCase({
    create: jest.fn(),
    getCustomerByEmail: jest.fn().mockImplementation(getCustomerSpy),
  });

  return { sut };
}

describe('GetCustomerUseCase', () => {
  it('should be able to get customer', async () => {
    const { sut } = makeSut(getCustomerSuccessSpy);

    await expect(sut.execute('vagnereix.dev@gmail.com')).resolves.not.toThrow();

    expect(getCustomerSuccessSpy).toHaveBeenCalled();
  });

  it('should not be able to get customer when is a invalid email', async () => {
    const { sut } = makeSut(getCustomerErrorSpy);

    await expect(sut.execute('invalid.email@gmail.com')).rejects.toThrow();
  });
});
