import {FieldError} from "react-hook-form";

export function getErrorText(label: string, fieldError: FieldError): string {
  if (fieldError.message) {
    return fieldError.message;
  }
  switch (fieldError.type) {
    case 'required':
      return `${label} is required`;
    case 'minLength':
      return `${label} must be at least ${fieldError.types?.minLength} characters`;
    case 'maxLength':
      return `${label} must be at most ${fieldError.types?.maxLength} characters`;
    case 'pattern':
      return `${label} must be a valid ${fieldError.ref?.type}`;
    default:
      return `${label} is invalid`;
  }
}
