import type { FC } from 'react';

import { locale } from '~/constants/locale';

import { Button } from './Button';

type TProps = {
  name?: string;
  onLogout: VoidFunction;
};

export const Header: FC<TProps> = ({ name, onLogout }) => (
  <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900">
            {locale.products.toUpperCase()}
          </h1>
          <div className="text-sm text-gray-500">
            {locale.hello}, {name}
          </div>
        </div>
        <Button onClick={onLogout} variant="danger" size="sm">
          {locale.logout}
        </Button>
      </div>
    </div>
  </header>
);
