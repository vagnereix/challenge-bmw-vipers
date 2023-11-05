import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { SignUpForm } from '../SignUpForm';
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
  const inputs = screen.getAllByRole('textbox');
  const button = screen.getByRole('button');

  return { inputs, button };
}

describe(`<SignUpForm />`, () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it(`should render correctly`, () => {
    render(<SignUpForm />);

    const { inputs, button } = getInputAndButton();

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      `Please, fill some information's.`,
    );
    expect(screen.getByRole('form')).toBeInTheDocument();
    expect(inputs[0]).toHaveAttribute('type', 'text');
    expect(inputs[1]).toHaveAttribute('type', 'email');
    expect(button).toHaveTextContent(`Register`);
    expect(screen.getByRole('link')).toHaveTextContent(`Sign in.`);
  });

  it(`should register function work correctly`, async () => {
    axios.post = jest.fn().mockResolvedValue({
      data: {
        customer: {
          email: `vagnereix.dev@gmail.com`,
        },
      },
    });

    render(<SignUpForm />);

    const { inputs, button } = getInputAndButton();

    act(() => {
      fireEvent.change(inputs[0], {
        target: { value: `Vagner` },
      });
      fireEvent.change(inputs[1], {
        target: { value: `vagnereix.dev@gmail.com` },
      });
      fireEvent.click(button);
    });

    await waitFor(() => {
      expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();

      expect(axios.post).toHaveBeenCalledWith(`/api/customer`, {
        name: `Vagner`,
        email: `vagnereix.dev@gmail.com`,
      });

      expect(pushMock).toHaveBeenCalledWith(`/sign-in`);
    });
  });

  it(`should work correctly when name or email field is empty`, async () => {
    axios.get = jest.fn().mockRejectedValue({
      message: 'Request failed with status code 404',
      response: {
        data: { error: 'Customer not found' },
        status: 404,
      },
    });

    render(<SignUpForm />);

    const { inputs, button } = getInputAndButton();

    act(() => {
      fireEvent.change(inputs[0], {
        target: { value: `` },
      });
      fireEvent.change(inputs[1], {
        target: { value: `` },
      });
      fireEvent.click(button);
    });

    await waitFor(() => {
      expect(pushMock).not.toHaveBeenCalled();
    });
  });

  it(`should sign in function work correctly with axios error`, async () => {
    axios.post = jest.fn().mockRejectedValue({
      message: 'Request failed with status code 404',
      response: {
        data: { error: 'Customer not found' },
        status: 404,
      },
    });

    render(<SignUpForm />);

    const { inputs, button } = getInputAndButton();

    act(() => {
      fireEvent.change(inputs[0], {
        target: { value: `User` },
      });
      fireEvent.change(inputs[1], {
        target: { value: `no.email@gmail.com` },
      });
      fireEvent.click(button);
    });

    await waitFor(() => {
      expect(screen.getByText('Customer not found')).toBeInTheDocument();
      expect(pushMock).not.toHaveBeenCalled();
    });
  });
});
