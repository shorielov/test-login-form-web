"use client";

import { FC, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import classNames from "classnames";

type OptionProps = {
  text: string;
  isValidated: boolean;
  expression: RegExp;
};

interface PasswordErrorsProps {
  options: OptionProps[];
}

export const PasswordErrors: FC<PasswordErrorsProps> = ({ options }) => {
  const [validation, setValidation] = useState(options);

  const { watch, formState } = useFormContext();
  const password = watch("password", "");
  console.log(formState);

  useEffect(() => {
    if (formState.isSubmitSuccessful) setValidation(options);
  }, [formState.isSubmitSuccessful, options]);

  useEffect(() => {
    const newValidation = validation.map((option) => ({
      ...option,
      isValidated: option.expression.test(password),
    }));

    setValidation(newValidation);
  }, [password]);

  return (
    <div className="w-full">
      {formState.isSubmitted && formState.errors.password && (
        <div className="flex px-4 w-full items center">
          <span className="text-error text-center">
            This password doesn't look right. Please try again or reset it now.
          </span>
        </div>
      )}
      {!formState.isSubmitted && (
        <ul className="mt-2 pl-[20px] text-[12px] text-black">
          {validation.map(({ text, isValidated }) => (
            <li key={text}>
              <span
                className={classNames(
                  isValidated ? "text-green" : "text-error",
                  "h-5 w-5"
                )}
              >
                {text}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
