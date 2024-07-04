import { string, object, InferType } from 'yup';

export const schema = object().shape({
  email: string().email('Enter correct email').required(),
  password: string()
    .matches(/^[^\s]{8,}$/, 'Password must be at least 8 characters (no spaces)')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/\d/, 'Password must contain at least one digit')
    .required('Password is required'),
});

export type LoginFormSchema = typeof schema;
export type LoginFormValues = InferType<LoginFormSchema>;
