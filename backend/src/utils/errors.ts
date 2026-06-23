import { ValidationError } from '@nestjs/common';

export function collectErrors(errors: ValidationError[]): string[] {
  const result: string[] = [];

  for (const error of errors) {
    if (error.constraints) {
      result.push(...Object.values(error.constraints));
    }

    if (error.children?.length) {
      result.push(...collectErrors(error.children));
    }
  }

  return result;
}