import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { UpdateOrderForm } from '../UpdateOrderForm';
import React from 'react';
import { api } from '@/services/api';
import nextCache from 'next/cache';

const pushMock = jest.fn();
const revalidatePathMock = jest.fn();

jest.mock('../../context/useAuth.tsx', () => ({
  useAuth() {
    return {
      user: {
        id: 'valid-customer-id',
      },
    };
  },
}));

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn().mockImplementation(pushMock),
    };
  },
}));

jest.spyOn(nextCache, 'revalidatePath').mockImplementation(revalidatePathMock);

function getInputAndButton() {
  const input = screen.getByRole('textbox');
  const button = screen.getByRole('button');

  return { input, button };
}

const order = {
  id: `valid-order-id`,
  title: `Order title`,
  customerId: `valid-customer-id`,
};

describe(`<UpdateOrderForm />`, () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it(`should render correctly`, () => {
    render(<UpdateOrderForm order={order} />);

    const { input, button } = getInputAndButton();

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      `You can edit your order title.`,
    );
    expect(screen.getByRole('form')).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveValue(`Order title`);
    expect(button).toHaveTextContent(`Update`);
    expect(screen.getByRole('link')).toHaveTextContent(`Back to orders.`);
  });

  it(`should update order correctly`, async () => {
    jest.spyOn(api, 'patch').mockResolvedValue({
      status: 200,
      response: {
        data: {
          order: {
            title: `Order updated`,
          },
        },
      },
    });

    render(<UpdateOrderForm order={order} />);

    const { input, button } = getInputAndButton();

    act(() => {
      fireEvent.change(input, { target: { value: `Order updated` } });
      fireEvent.click(button);
    });

    await waitFor(() => {
      expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();

      expect(api.patch).toHaveBeenCalledWith(
        `/order/${order.id}`,
        {
          ...order,
          title: `Order updated`,
        },
        {
          headers: {
            Authorization: 'valid-customer-id',
          },
        },
      );

      expect(revalidatePathMock).toHaveBeenCalledWith(`/orders`);
      expect(pushMock).toHaveBeenCalledWith(`/orders`);
    });
  });

  it(`should work correctly when title field is empty`, async () => {
    render(<UpdateOrderForm order={order} />);

    const { input, button } = getInputAndButton();

    act(() => {
      fireEvent.change(input, {
        target: { value: `` },
      });
      fireEvent.click(button);
    });

    await waitFor(() => {
      expect(api.patch).not.toHaveBeenCalled();
      expect(pushMock).not.toHaveBeenCalled();
    });
  });

  it(`should create function work correctly with axios error`, async () => {
    jest.spyOn(api, 'patch').mockRejectedValue({
      status: 404,
      message: 'Request failed with status code 404',
      response: {
        data: { error: 'Error updating order' },
      },
    });

    render(<UpdateOrderForm order={order} />);

    const { input, button } = getInputAndButton();

    act(() => {
      fireEvent.change(input, {
        target: { value: `invalid-title` },
      });
      fireEvent.click(button);
    });

    await waitFor(() => {
      expect(
        screen.getByText(`Error updating order. Try again later.`),
      ).toBeInTheDocument();
      expect(pushMock).not.toHaveBeenCalled();
    });
  });
});
