import type { FC } from 'react';

import { locale } from '~/constants/locale';

export const ProgressBar: FC = () => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 mb-8">
    <div className="flex items-center gap-4">
      <div className="flex-1 h-3 rounded-full overflow-hidden shadow-inner bg-gradient-to-r from-slate-200 via-gray-100 to-slate-200">
        <div
          className="h-3 bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-500 shadow-lg"
          style={{
            width: '0%',
            animation: 'grow 2s cubic-bezier(0.4, 0, 0.2, 1) forwards',
          }}
        />
      </div>
      <span className="font-medium text-gray-700">{locale.loading}</span>
    </div>
  </div>
);
