import { act, renderHook, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from './useAuth';
import * as cookies from 'cookies-next';
import { api } from '@/services/api';

jest.spyOn(api, 'get').mockResolvedValue({
  data: {
    customer: {
      id: `valid-id`,
      name: `Vagner`,
      email: `vagnereix.dev@gmail.com`,
    },
  },
});

describe(`useSession`, () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it(`should return the session`, () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current).toEqual({ isAuthenticated: false, user: null });
  });

  it(`should return user logged in`, async () => {
    jest
      .spyOn(cookies, 'getCookie')
      .mockReturnValueOnce(JSON.stringify(`vagnereix.dev@gmail.com`));

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await waitFor(() => {
      expect(result.current.isAuthenticated).toEqual(true);
    });
  });

  it(`should get user data correctly`, async () => {
    jest
      .spyOn(cookies, 'getCookie')
      .mockReturnValueOnce(JSON.stringify(`vagnereix.dev@gmail.com`));

    const result = await act(async () => {
      const rendered = renderHook(() => useAuth(), {
        wrapper: AuthProvider,
      });

      return rendered.result;
    });

    expect(result.current.user).toEqual({
      id: 'valid-id',
      name: 'Vagner',
      email: 'vagnereix.dev@gmail.com',
    });
  });
});
