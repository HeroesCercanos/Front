import { ILoginErrors, ILoginProps } from "@/interfaces/AuthInterfaces/login.interfaces";
import { IRegisterErrors, IRegisterValues } from "@/interfaces/AuthInterfaces/register.interfaces";


export function validateLoginForm(values: ILoginProps): ILoginErrors {
  const errors: ILoginErrors = {};

  if (!values.email) {
    errors.email = "Email requerido";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Email inválido";
  }

  if (!values.password) {
    errors.password = "Contraseña requerida";
  }

  return errors;
}


export function validateRegisterForm(values: IRegisterValues): IRegisterErrors {
  const errors: IRegisterErrors = {};

  if (!values.name.trim()) {
    errors.name = "Nombre requerido";
  }

  if (!values.email) {
    errors.email = "Email requerido";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
  ) {
    errors.email = "Email inválido";
  }

  if (!values.password) {
    errors.password = "Contraseña requerida";
  } else if (values.password.length < 6) {
    errors.password = "Debe tener al menos 6 caracteres";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Debes confirmar la contraseña";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Las contraseñas no coinciden";
  }

  return errors;
}


