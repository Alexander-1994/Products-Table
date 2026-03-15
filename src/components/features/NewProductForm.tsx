import type { FC } from 'react';
import { useForm } from 'react-hook-form';

import { locale } from '~/constants/locale';
import type { TNewProductForm } from '~/types/products';

import { Input, Button, Loader } from '../ui';

type TProps = {
  isLoading: boolean;
  onClose: VoidFunction;
  onSubmit: (data: TNewProductForm) => void;
};

export const NewProductForm: FC<TProps> = ({
  isLoading,
  onClose,
  onSubmit,
}) => {
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

  return (
    <>
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        {locale.addProduct}
      </h3>
      <form onSubmit={submitHandler(onSubmit)} className="space-y-6" noValidate>
        <Input
          label={locale.name}
          id="name"
          placeholder={locale.enterName}
          error={errors.name?.message}
          disabled={isLoading}
          {...register('name', {
            required: locale.requiredField,
            minLength: {
              value: 3,
              message: locale.minThreeCharacters,
            },
          })}
        />
        <Input
          label={locale.vendor}
          id="vendor"
          placeholder={locale.vendorExample}
          error={errors.vendor?.message}
          disabled={isLoading}
          {...register('vendor', {
            required: locale.requiredField,
            minLength: {
              value: 3,
              message: locale.minThreeCharacters,
            },
          })}
        />
        <Input
          label={locale.article}
          id="article"
          placeholder="ART-12345"
          error={errors.article?.message}
          disabled={isLoading}
          {...register('article', {
            required: locale.requiredField,
            minLength: {
              value: 3,
              message: locale.minThreeCharacters,
            },
          })}
        />
        <Input
          label={`${locale.price} $`}
          id="price"
          type="number"
          placeholder="99.99"
          error={errors.price?.message}
          disabled={isLoading}
          {...register('price', {
            required: locale.requiredField,
            min: 0,
          })}
        />
        <Input
          label={`${locale.rating} (1-5)`}
          id="rating"
          type="number"
          placeholder="4.5"
          error={errors.rating?.message}
          {...register('rating', {
            valueAsNumber: true,
            min: {
              value: 1,
              message: locale.minOne,
            },
            max: {
              value: 5,
              message: locale.maxFive,
            },
          })}
        />
        <div className="flex justify-end gap-3 pt-6">
          <Button variant="secondary" disabled={isLoading} onClick={onClose}>
            {locale.cancel}
          </Button>
          <Button type="submit" variant="primary" disabled={isLoading}>
            {isLoading ? <Loader /> : locale.add}
          </Button>
        </div>
      </form>
    </>
  );
};
