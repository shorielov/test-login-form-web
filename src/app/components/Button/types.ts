import { ButtonHTMLAttributes } from "react";

export enum ButtonVariants {
  primary = 'primary',
  secondary = 'secondary',
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: `${ButtonVariants}`,
};
