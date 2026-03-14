import type { FC } from 'react';

import { Button } from './Button';

type TProps = {
  name: string;
  onProductAdd: VoidFunction;
  onLogout: VoidFunction;
};

export const Header: FC<TProps> = ({ name, onProductAdd, onLogout }) => (
  <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Products Table</h1>
          <div className="text-sm text-gray-500">Привет, {name}</div>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={onProductAdd} variant="primary" size="sm">
            Добавить товар
          </Button>
          <Button onClick={onLogout} variant="danger" size="sm">
            Выйти
          </Button>
        </div>
      </div>
    </div>
  </header>
);
