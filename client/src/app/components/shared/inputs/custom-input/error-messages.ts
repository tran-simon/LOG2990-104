export const defaultErrorMessages = (errorMessages: Dictionary<string> = {}): Dictionary<string> => {
  return {
    pattern: errorMessages['pattern'] || 'La valeur doit être conforme au patron',
    required: errorMessages['required'] || 'La valeur est requise',
    maxlength: errorMessages['maxLength'] || 'La chaîne doit être plus petite',
    minlength: errorMessages['minLength'] || 'La chaîne doit être plus grande',
  };
};

export interface Dictionary<T> {
  [key: string]: T;
}
