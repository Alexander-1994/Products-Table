import { type FC, type PropsWithChildren, useEffect } from 'react';
import ReactDOM from 'react-dom';

type TProps = {
  isOpen: boolean;
  onClose: VoidFunction;
};

export const Modal: FC<PropsWithChildren<TProps>> = ({
  isOpen,
  onClose,
  children,
}) => {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEsc);

    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return isOpen
    ? ReactDOM.createPortal(
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
            {children}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 text-xl p-1 rounded-lg hover:bg-gray-100 transition-all cursor-pointer"
            >
              x
            </button>
          </div>
        </div>,
        document.body
      )
    : null;
};
