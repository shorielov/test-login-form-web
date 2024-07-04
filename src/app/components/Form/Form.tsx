'use client';

import React, { PropsWithChildren } from 'react';
import { FormProvider, useForm, FormProps as FormPropsBase, FieldValues, DefaultValues, SubmitErrorHandler, SubmitHandler } from 'react-hook-form';
import { AnyObjectSchema } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { InputProps } from '../Input';

interface FormProps<TFieldValues extends FieldValues> {
  schema?: AnyObjectSchema,
  className?: string,
  defaultValues?: DefaultValues<TFieldValues>,
  onInvalid?: SubmitErrorHandler<TFieldValues>,
  onSubmit?: SubmitHandler<TFieldValues>,
};

export const Form = <TFieldValues extends FieldValues>({
  children,
  className,
  schema,
  defaultValues,
  onInvalid,
  onSubmit,
}: PropsWithChildren<FormProps<TFieldValues>>) => {
  const form = useForm<TFieldValues>({
    mode: 'all',
    resolver: schema ? yupResolver(schema) : undefined,
    defaultValues,
  });

  const handleValid: SubmitHandler<TFieldValues> = (data) => {
    onSubmit?.(data);
  };

  const handleInvalid: SubmitErrorHandler<TFieldValues> = (data) => {
    onInvalid?.(data);
  };

  const renderChildren = (
    child: React.ReactElement,
    index: number
  ): React.ReactNode => {
    if (child?.props?.name) {
      return React.createElement(
        child.type as React.ComponentType<InputProps>,
        {
          ...child?.props,
          register: form.register,
          key: `${child.props?.name}_${index}`,
          error: form.formState.errors[child.props?.name]?.message,
        }
      );
    }

    if (child?.props?.children) {
      return React.cloneElement(child, {
        ...child.props,
        children: React.Children.map(
          child.props.children,
          (childElement, childIndex) =>
            renderChildren(childElement as React.ReactElement, childIndex)
        ),
      });
    }

    return child;
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(handleValid, handleInvalid)}
        className={className}
      >
        {React.Children.map(children as React.ReactElement[], (child, index) =>
          renderChildren(child, index)
        )}
      </form>
    </FormProvider>
  );
};
