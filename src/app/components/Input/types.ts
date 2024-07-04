import { InputHTMLAttributes, MouseEvent, ReactNode } from 'react';
import { useForm } from 'react-hook-form';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  register?: ReturnType<typeof useForm>['register'];
  name: string;
  error?: string;
  label?: string;
  icon?: ReactNode;
  showError?: boolean;
  onIconClick?(event: MouseEvent<HTMLDivElement>): void;
}
