import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import type { LoginCredentials } from '../types/auth';

const USERS = [
  { username: 'kminchelle', password: '0lelplR' },
  { username: 'emilys', password: 'emilyspass' },
  { username: 'lindsayferguson', password: 'mQww9Ggp3' },
];

export const LoginForm: React.FC = () => {
  const { login, loading } = useAuth();
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: 'kminchelle',
    password: 'emilyspass',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await login(credentials);
    } catch (err) {
      setError('Неверный логин или пароль');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Вход</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Логин</label>
          <select
            value={credentials.username}
            onChange={(e) =>
              setCredentials({
                ...credentials,
                username: e.target.value,
              })
            }
            className="w-full p-2 border rounded-md"
            disabled={loading}
          >
            {USERS.map((user) => (
              <option key={user.username} value={user.username}>
                {user.username}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Пароль</label>
          <input
            type="password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({
                ...credentials,
                password: e.target.value,
              })
            }
            className="w-full p-2 border rounded-md"
            disabled={loading}
          />
        </div>

        {error && (
          <div className="p-2 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Вход...' : 'Войти'}
        </button>
      </form>

      <div className="mt-4 text-xs text-gray-500">
        Тестовые пользователи выше
      </div>
    </div>
  );
};
