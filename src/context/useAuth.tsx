'use client';

import { api } from '@/services/api';
import { Customer } from '@prisma/client';
import { getCookie } from 'cookies-next';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  ReactNode,
} from 'react';

type SessionContextData = {
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
  isAuthenticated: boolean;
};

type SessionProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext({} as SessionContextData);

export function AuthProvider({ children }: SessionProviderProps) {
  const mailCustomer = useMemo(() => getCookie('@bmw.customer.email'), []);
  const [user, setUser] = useState<Customer | null>(null);

  useEffect(() => {
    async function getUserInfo() {
      const { data } = await api.get<{ customer: Customer }>('/customer', {
        params: {
          email: JSON.parse(mailCustomer as string),
        },
      });

      setUser(data.customer);
    }

    getUserInfo();
  }, [mailCustomer]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: Boolean(mailCustomer), user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};
