import { type FC, useState, useEffect } from 'react';

import { locale } from '~/constants/locale';
import { useDebounce } from '~/hooks/useDebounce';
import type { TSearchParams } from '~/types/products';

import { Input } from '../ui';

type TProps = {
  onSearch: (queries: TSearchParams) => void;
  onClear: VoidFunction;
};

export const ProductSearch: FC<TProps> = ({ onSearch, onClear }) => {
  const [search, setSearch] = useState('');

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (debouncedSearch) {
      onSearch({ q: debouncedSearch });
    }
  }, [debouncedSearch]);

  const handleClear = () => {
    setSearch('');
    onClear();
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-4 items-center lg:items-end">
        <div className="flex-1 min-w-0">
          <Input
            label={locale.searchByProduct}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClear={handleClear}
            placeholder={locale.find}
            className="text-lg"
          />
        </div>
      </div>
    </div>
  );
};
