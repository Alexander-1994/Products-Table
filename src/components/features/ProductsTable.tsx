import { type FC, useState, useEffect } from 'react';

import { locale } from '~/constants/locale';
import type { TProduct, TSortParams } from '~/types/products';

import { Button, ProgressBar, Pagination } from '../ui';

type TSortBy = keyof Pick<TProduct, 'price' | 'rating'>;
type TOrder = 'asc' | 'desc';

type TProps = {
  items: TProduct[];
  isLoading: boolean;
  onUpdate: VoidFunction;
  onAdd: VoidFunction;
  onSort: (queries: TSortParams) => void;
};

export const ProductsTable: FC<TProps> = ({
  items,
  isLoading,
  onUpdate,
  onAdd,
  onSort,
}) => {
  const [sortBy, setSortBy] = useState<TSortBy>();
  const [order, setOrder] = useState<TOrder>();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const arrow = order === 'asc' ? '↑' : '↓';

  useEffect(() => {
    setCurrentPage(1);
  }, [items.length]);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = items.slice(startIndex, endIndex);

  const goToPrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const goToNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
  const goToPage = (page: number) => setCurrentPage(page);

  const renderHeader = () => (
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-bold text-gray-900">
        {locale.allPositions}: {items.length}
        {totalPages > 0 &&
          ` (${locale.page.toLowerCase()} ${currentPage} из ${totalPages})`}
      </h2>
      <div className="flex justify-end gap-3 py-5">
        <Button onClick={onUpdate} variant="secondary" size="sm">
          {locale.update}
        </Button>
        <Button onClick={onAdd} variant="primary" size="sm">
          {locale.add}
        </Button>
      </div>
    </div>
  );

  const handleSortUpdate = (sortBy: TSortBy) => {
    onSort({ sortBy, order });
    setSortBy(sortBy);
    setOrder((prev) => {
      switch (prev) {
        case 'asc':
          return 'desc';
        case 'desc':
          return 'asc';
        default:
          return 'desc';
      }
    });
  };

  const handleActionClick = (id: number) =>
    alert(`${locale.clickOnActionButton} ${id}`);

  return (
    <>
      {isLoading ? <ProgressBar /> : renderHeader()}
      <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-indigo-50 to-purple-50">
              <tr>
                <th className="px-6 py-5 text-left text-xs font-bold text-gray-900 uppercase tracking-wider rounded-tl-2xl">
                  {locale.name}
                </th>
                <th className="px-6 py-5 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                  {locale.vendor}
                </th>
                <th className="px-6 py-5 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                  {locale.article}
                </th>
                <th
                  className="px-6 py-5 text-right text-xs font-bold text-gray-900 uppercase tracking-wider cursor-pointer hover:bg-indigo-100"
                  onClick={() => handleSortUpdate('price')}
                >
                  {locale.price} {sortBy === 'price' && arrow}
                </th>
                <th
                  className="px-6 py-5 text-right text-xs font-bold text-gray-900 uppercase tracking-wider cursor-pointer hover:bg-indigo-100"
                  onClick={() => handleSortUpdate('rating')}
                >
                  {locale.rating} {sortBy === 'rating' && arrow}
                </th>
                <th className="px-6 py-5 text-center text-xs font-bold text-gray-900 uppercase tracking-wider">
                  {locale.actions}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedItems.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-12">
                        <img
                          className="h-12 w-12 rounded-xl object-cover"
                          /* Изображения подгружаются только если включен vpn... */
                          src={product.image}
                          alt=""
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-bold text-gray-900">
                          {product.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-900 font-medium">
                    {product.vendor}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-500">
                    {product.article}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-right text-sm font-bold text-gray-900">
                    ${product.price}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-right">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${
                        product.rating < 3
                          ? 'bg-red-100 text-red-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {product.rating}
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                    <Button
                      size="sm"
                      onClick={() => handleActionClick(product.id)}
                    >
                      {locale.action}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          totalPages={totalPages}
          startIndex={startIndex}
          endIndex={endIndex}
          itemsLength={items.length}
          currentPage={currentPage}
          goToPrev={goToPrev}
          goToPage={goToPage}
          goToNext={goToNext}
        />
      </div>
    </>
  );
};
