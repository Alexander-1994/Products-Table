import type { FC } from 'react';

import { locale } from '~/constants/locale';

import { Button } from './Button';

type TProps = {
  totalPages: number;
  startIndex: number;
  endIndex: number;
  itemsLength: number;
  currentPage: number;
  goToPrev: VoidFunction;
  goToPage: (page: number) => void;
  goToNext: VoidFunction;
};

export const Pagination: FC<TProps> = ({
  totalPages,
  startIndex,
  endIndex,
  itemsLength,
  currentPage,
  goToPrev,
  goToPage,
  goToNext,
}) =>
  totalPages > 1 && (
    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700">
          {locale.pagination
            .replace(
              '{current}',
              `${startIndex + 1} - ${Math.min(endIndex, itemsLength)}`
            )
            .replace('{total}', itemsLength.toString())}
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="secondary"
            disabled={currentPage === 1}
            onClick={goToPrev}
          >
            {locale.back}
          </Button>
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                size="sm"
                variant={currentPage === page ? 'primary' : 'ghost'}
                onClick={() => goToPage(page)}
              >
                {page}
              </Button>
            ))}
          </div>
          <Button
            size="sm"
            variant="secondary"
            disabled={currentPage === totalPages}
            onClick={goToNext}
          >
            {locale.next}
          </Button>
        </div>
      </div>
    </div>
  );
