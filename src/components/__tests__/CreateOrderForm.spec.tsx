import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { CreateOrderForm } from '../CreateOrderForm';
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

describe(`<CreateOrderForm />`, () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it(`should render correctly`, () => {
    render(<CreateOrderForm />);

    const { input, button } = getInputAndButton();

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      `Create your new order.`,
    );
    expect(screen.getByRole('form')).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
    expect(button).toHaveTextContent(`Create`);
    expect(screen.getByRole('link')).toHaveTextContent(`Back to orders.`);
  });

  it(`should create order function work correctly`, async () => {
    jest.spyOn(api, 'post').mockResolvedValue({
      status: 201,
      response: {
        data: {
          order: {
            title: `New order`,
          },
        },
      },
    });

    render(<CreateOrderForm />);

    const { input, button } = getInputAndButton();

    act(() => {
      fireEvent.change(input, { target: { value: `New order` } });
      fireEvent.click(button);
    });

    await waitFor(() => {
      expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();

      expect(api.post).toHaveBeenCalledWith(
        `/order`,
        {
          title: `New order`,
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
    render(<CreateOrderForm />);

    const { input, button } = getInputAndButton();

    act(() => {
      fireEvent.change(input, {
        target: { value: `` },
      });
      fireEvent.click(button);
    });

    await waitFor(() => {
      expect(api.post).not.toHaveBeenCalled();
      expect(pushMock).not.toHaveBeenCalled();
    });
  });

  it(`should create function work correctly with axios error`, async () => {
    jest.spyOn(api, 'post').mockRejectedValue({
      status: 404,
      message: 'Request failed with status code 404',
      response: {
        data: { error: 'Error creating order' },
      },
    });

    render(<CreateOrderForm />);

    const { input, button } = getInputAndButton();

    act(() => {
      fireEvent.change(input, {
        target: { value: `invalid-title` },
      });
      fireEvent.click(button);
    });

    await waitFor(() => {
      expect(
        screen.getByText(`Error creating order. Try again later.`),
      ).toBeInTheDocument();
      expect(pushMock).not.toHaveBeenCalled();
    });
  });
});
