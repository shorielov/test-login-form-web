'use client';

import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { Input } from '@clario/app/components/Input';
import { Form } from '@clario/app/components/Form';

import { PasswordErrors } from './components/PasswordErrors';
import { Button } from '@clario/app/components/Button/Button';
import { FieldErrors, SubmitErrorHandler, SubmitHandler } from 'react-hook-form';
import { LoginFormValues, schema } from './schema';

const DEFAULT_VALUES: LoginFormValues = {
  email: '',
  password: '',
};


const OPTIONS = [
  {
    text: '8 characters or more (no spaces)',
    expression: /^[^\s]{8,}$/,
    isValidated: false,
  },
  {
    text: 'Uppercase and lowercase letters',
    expression: /(?=.*[a-z])(?=.*[A-Z])/,
    isValidated: false,
  },
  {
    text: 'At least one digit',
    expression: /.*\d/,
    isValidated: false,
  },
];

export const LoginForm = () => {
  const [shouldshowPass, setShouldShowPass] = useState(false);

  const handleSubmit: SubmitHandler<LoginFormValues> = async (formData) => {
    console.log(formData);
  };

  const handleInvalid: SubmitErrorHandler<LoginFormValues> = (data) => {
    console.log(data);
  };

  const handleIconClick = () => setShouldShowPass(!shouldshowPass);

  return (
    <Form
      onSubmit={handleSubmit}
      onInvalid={handleInvalid}
      schema={schema}
      defaultValues={DEFAULT_VALUES}
      className="flex w-full flex-col items-center gap-[20px]"
    >
      <Input
        name="email"
        type="email"
        placeholder="Enter your email address"
        autoComplete="email"
        showError={false}
      />

      <Input
        name="password"
        type={shouldshowPass ? 'text' : 'password'}
        placeholder="Enter your password"
        autoComplete="password"
        showError={false}
        onIconClick={handleIconClick}
        icon={shouldshowPass ? <FaEye width={16} height={16} /> : <FaEyeSlash width={16} height={16} />}
      />

      <PasswordErrors options={OPTIONS} />

      <Button
        type="submit"
        variant="secondary"
        className="w-[240px]"
      >
        Sign up
      </Button>
    </Form>
  );
};
