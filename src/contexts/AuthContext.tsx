import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import type { AuthResponse, User, LoginCredentials } from '@/types/auth';
import AuthService from '@/services/auth';

interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  loading: boolean;
  accessToken: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    // Восстановление сессии
    const token = AuthService.getAccessToken();
    if (token) {
      setAccessToken(token);
      loadUser(token);
    } else {
      setLoading(false);
    }
  }, []);

  const loadUser = async (token: string) => {
    try {
      const userData = await AuthService.getMe(token);
      setUser(userData);
    } catch {
      AuthService.clearTokens();
      setAccessToken(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      setLoading(true);
      const authData: AuthResponse = await AuthService.login(credentials);

      console.log(authData);

      AuthService.setTokens({
        accessToken: authData.accessToken,
        refreshToken: authData.refreshToken,
      });

      setAccessToken(authData.accessToken);
      setUser({
        id: authData.id,
        username: authData.username,
        email: authData.email,
        firstName: authData.firstName,
        lastName: authData.lastName,
        gender: authData.gender,
        image: authData.image,
      });
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    AuthService.clearTokens();
    setUser(null);
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, accessToken }}>
      {children}
    </AuthContext.Provider>
  );
};
