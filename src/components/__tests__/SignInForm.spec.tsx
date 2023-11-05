import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { SignInForm } from '../SignInForm';
import axios from 'axios';
import React from 'react';

const pushMock = jest.fn();

jest.mock('axios');
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn().mockImplementation(pushMock),
    };
  },
}));

function getInputAndButton() {
  const input = screen.getByRole('textbox');
  const button = screen.getByRole('button');

  return { input, button };
}

describe(`<SignInForm />`, () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it(`should render correctly`, () => {
    render(<SignInForm />);

    const { input, button } = getInputAndButton();

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      `Welcome back, please sign in.`,
    );
    expect(screen.getByRole('form')).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'email');
    expect(button).toHaveTextContent(`Sign in`);
    expect(screen.getByRole('link')).toHaveTextContent(`Sign up.`);
  });

  it(`should sign in function work correctly`, async () => {
    axios.get = jest.fn().mockResolvedValue({
      data: {
        customer: {
          email: `vagnereix.dev@gmail.com`,
        },
      },
    });

    render(<SignInForm />);

    const { input, button } = getInputAndButton();

    act(() => {
      fireEvent.change(input, { target: { value: `vagnereix.dev@gmail.com` } });
      fireEvent.click(button);
    });

    await waitFor(() => {
      expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();

      expect(axios.get).toHaveBeenCalledWith(`/api/customer`, {
        params: {
          email: `vagnereix.dev@gmail.com`,
        },
      });

      expect(pushMock).toHaveBeenCalledWith(`/orders`);
    });
  });

  it(`should work correctly when email field is empty`, async () => {
    axios.get = jest.fn().mockRejectedValue({
      message: 'Request failed with status code 404',
      response: {
        data: { error: 'Customer not found' },
        status: 404,
      },
    });

    render(<SignInForm />);

    const { input, button } = getInputAndButton();

    act(() => {
      fireEvent.change(input, {
        target: { value: `` },
      });
      fireEvent.click(button);
    });

    await waitFor(() => {
      expect(pushMock).not.toHaveBeenCalled();
    });
  });

  it(`should sign in function work correctly with axios error`, async () => {
    axios.get = jest.fn().mockRejectedValue({
      message: 'Request failed with status code 404',
      response: {
        data: { error: 'Customer not found' },
        status: 404,
      },
    });

    render(<SignInForm />);

    const { input, button } = getInputAndButton();

    act(() => {
      fireEvent.change(input, {
        target: { value: `no.email@gmail.com` },
      });
      fireEvent.click(button);
    });

    await waitFor(() => {
      expect(screen.getByText('User not found')).toBeInTheDocument();
      expect(pushMock).not.toHaveBeenCalled();
    });
  });
});
