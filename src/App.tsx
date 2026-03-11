import { useAuth } from './contexts/AuthContext';
import { LoginForm } from './components/LoginForm';

export const App = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return <LoginForm />;
  }

  return (
    <div className="p-8">
      <div className="mb-4 p-4 bg-green-100 rounded">
        <h1>
          Добро пожаловать, {user.firstName} {user.lastName}!
        </h1>
        <p>
          ID: {user.id} | Email: {user.email}
        </p>
        <button
          onClick={logout}
          className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Выйти
        </button>
      </div>
    </div>
  );
};
