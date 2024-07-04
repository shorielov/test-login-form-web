import React, { FC, PropsWithChildren } from 'react';

import { ButtonProps, ButtonVariants } from './types';
import classNames from 'classnames';

const CLASS_NAME_BY_VARIANT: Record<ButtonVariants, string> = {
  [ButtonVariants.primary]: 'bg-gradient-primary',
  [ButtonVariants.secondary]: 'bg-gradient-secondary text-white',
};

export const Button: FC<PropsWithChildren<ButtonProps>> = ({ children, variant = ButtonVariants.primary, className, ...otherProps }) => {
  return (
    <button
      {...otherProps}
      className={classNames(
        'btn text-md rounded-full border-none py-2.5 font-bold',
        CLASS_NAME_BY_VARIANT[variant],
        className,
      )}
    >
      {children}
    </button>
  )
}
