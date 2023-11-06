import { act, render, screen, waitFor } from '@testing-library/react';
import { OrdersList } from '../OrdersList';
import { api } from '@/services/api';
import nextCache from 'next/cache';

const revalidatePathMock = jest.fn();

jest.spyOn(nextCache, 'revalidatePath').mockImplementation(revalidatePathMock);

jest.mock('../../context/useAuth.tsx', () => ({
  useAuth() {
    return {
      user: {
        id: 'valid-customer-id',
      },
    };
  },
}));

describe(`<OrdersList />`, () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it(`should render a empty list of orders correctly`, () => {
    render(<OrdersList orders={[]} />);

    expect(screen.queryAllByTestId(/order-/)).toEqual([]);
  });

  it(`should render a list of orders`, () => {
    render(
      <table>
        <tbody>
          <OrdersList
            orders={[
              {
                id: 'valid-id',
                title: 'Order 1',
                customerId: 'valid-customer-id',
              },
              {
                id: 'valid-id-2',
                title: 'Order 2',
                customerId: 'valid-customer-id-2',
              },
            ]}
          />
        </tbody>
      </table>,
    );

    expect(screen.getAllByTestId(/order-/)).toHaveLength(2);
  });

  it(`should exec handle delete function correctly`, async () => {
    const deleteSpy = jest.spyOn(api, 'delete').mockResolvedValue({
      status: 200,
      response: {
        data: {
          message: 'Order deleted successfully.',
        },
      },
    });

    render(
      <table>
        <tbody>
          <OrdersList
            orders={[
              {
                id: 'valid-id',
                title: 'Order 1',
                customerId: 'valid-customer-id',
              },
            ]}
          />
        </tbody>
      </table>,
    );

    const button = screen.getByRole('button');

    act(() => {
      button.click();
    });

    await waitFor(() => {
      expect(deleteSpy).toHaveBeenCalledWith(`/order/valid-id`, {
        headers: {
          Authorization: 'valid-customer-id',
        },
      });

      expect(revalidatePathMock).toHaveBeenCalled();
    });
  });

  it(`should catch error on handle delete correctly`, async () => {
    jest.spyOn(api, 'delete').mockRejectedValue({
      status: 401,
      message: 'Request failed with status code 401',
      response: {
        data: {
          message: 'Unauthorized',
        },
      },
    });

    render(
      <table>
        <tbody>
          <OrdersList
            orders={[
              {
                id: 'valid-id',
                title: 'Order 1',
                customerId: 'valid-customer-id',
              },
            ]}
          />
        </tbody>
      </table>,
    );

    const button = screen.getByRole('button');

    act(() => {
      button.click();
    });

    expect(revalidatePathMock).not.toHaveBeenCalled();
  });
});
