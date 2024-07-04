import React, { ChangeEvent } from "react";
import classNames from "classnames";

import { InputProps } from "./types";
import { useFormContext } from "react-hook-form";

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      register,
      name,
      className,
      error,
      label,
      icon,
      showError = true,
      onIconClick,
      ...rest
    },
    ref
  ) => {
    const { formState, getValues, reset } = useFormContext();
    const shouldUseErrorStyles = formState.isSubmitted && error;
    const isTouched = name && formState.touchedFields[name];
    const formProps = register ? register(name, {}) : { onChange: () => {} }; 
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (formState.isSubmitted) {
        reset({
          ...getValues(),
          [name]: event.target.value,
        });

        return;
      }

      formProps?.onChange?.(event);
    };

    return (
      <div className="flex flex-col w-full">
        {label && (
          <label
            htmlFor={label}
            className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
          >
            {label}
          </label>
        )}

        <div className="relative">
          <input
            {...formProps}
            {...rest}
            onChange={handleChange}
            className={classNames(
              "text-sm sm:text-base relative w-full border rounded-[10px] placeholder-blue focus:border-blue focus:outline-none py-[10px] pr-2 pl-2",
              !!icon && "pr-12",
              !shouldUseErrorStyles && 'border-transparent',
              shouldUseErrorStyles && 'border-error focus:border-error text-error',
              isTouched && !error && 'border-green text-green',
            )}
          />

          {icon && (
            <div className="absolute flex border border-transparent right-4 top-0 h-full w-10">
              <div className="flex items-center justify-center rounded-tr rounded-br z-10 w-full">
                <div className={classNames('w-4 text-gray', shouldUseErrorStyles && 'text-error')} onClick={onIconClick}>
                  {icon}
                </div>
              </div>
            </div>
          )}
        </div>

        {showError && error && (
          <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
