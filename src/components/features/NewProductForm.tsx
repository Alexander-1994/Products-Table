import { type FC } from 'react';
import { useForm } from 'react-hook-form';

import { useProducts } from '~/hooks/useProducts';
import { TProduct } from '~/types/products';

import { Input, Button, Loader } from '../ui';

type TNewProductForm = Omit<TProduct, 'id'>;

type TProps = {
  onClose: VoidFunction;
};

export const NewProductForm: FC<TProps> = ({ onClose }) => {
  const { handleProductCreate, loading } = useProducts();

  const {
    register,
    handleSubmit: submitHandler,
    formState: { errors },
  } = useForm<TNewProductForm>({
    defaultValues: {
      name: '',
      vendor: '',
      article: '',
    },
    mode: 'onChange',
  });

  const handleSubmit = async (data: TNewProductForm) => {
    await handleProductCreate({
      ...data,
      rating: 0,
    });
    onClose();
  };

  return (
    <>
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Добавить товар</h3>
      <form
        onSubmit={submitHandler(handleSubmit)}
        className="space-y-6"
        noValidate
      >
        <Input
          label="Наименование *"
          id="name"
          placeholder="Введите название товара"
          error={errors.name?.message}
          disabled={loading}
          {...register('name', {
            required: 'Наименование обязательно',
            minLength: {
              value: 3,
              message: 'Минимум 3 символа',
            },
          })}
        />
        <Input
          label="Производитель *"
          id="vendor"
          placeholder="Samsung, Apple и т.д."
          error={errors.vendor?.message}
          disabled={loading}
          {...register('vendor', {
            required: 'Производитель обязателен',
            minLength: {
              value: 3,
              message: 'Минимум 3 символа',
            },
          })}
        />
        <Input
          label="Артикул *"
          id="article"
          placeholder="ART-12345"
          error={errors.article?.message}
          disabled={loading}
          {...register('article', {
            required: 'Артикул обязателен',
            minLength: {
              value: 3,
              message: 'Минимум 3 символа',
            },
          })}
        />
        <Input
          label="Цена ($) *"
          id="price"
          type="number"
          placeholder="99.99"
          error={errors.price?.message}
          disabled={loading}
          {...register('price', {
            required: 'Цена обязательна',
            min: 0,
          })}
        />
        <Input
          label="Рейтинг (1-5)"
          id="rating"
          type="number"
          placeholder="4.5"
          error={errors.rating?.message}
          {...register('rating', {
            valueAsNumber: true,
            min: {
              value: 1,
              message: 'Минимум 1',
            },
            max: {
              value: 5,
              message: 'Максимум 5',
            },
          })}
        />
        {/* Кнопки */}
        <div className="flex justify-end gap-3 pt-6">
          <Button variant="secondary" disabled={loading} onClick={onClose}>
            Отмена
          </Button>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? <Loader /> : 'Добавить'}
          </Button>
        </div>
      </form>
    </>
  );
};
