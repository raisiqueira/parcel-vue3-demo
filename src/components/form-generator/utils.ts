import { z, type ZodString } from 'zod'
import { type FormGeneratorField } from "./types"

export const toZodSchema = (schemaFields: FormGeneratorField[] | undefined) => {
  let schemaObject = {};
  if (!schemaFields || schemaFields.length === 0) {
    return z.object(schemaObject);
  }

  schemaFields.forEach((field) => {
    if(field.as === "text") {
      let validator = z.string();

      // Apply minLength only if specified and for non-empty strings
      if(field.minLength) {
        validator = validator.min(field.minLength ?? 1, { message: `${field.label ?? field.name} must be at least ${field.minLength} characters` });
      }

      // Apply maxLength only if specified
      if(field.maxLength) {
        validator = validator.max(field.maxLength, { message: `${field.label ?? field.name} must be no more than ${field.maxLength} characters` });
      }

      // Make the field optional if not required
      if (!field.isRequired) {
        validator = validator.optional();
      }

      schemaObject[field.name] = validator;
    }

    if (field.as === "checkbox") {
      let validator = z.boolean();

      // Make the field optional if not required
      if (!field.isRequired) {
        validator = validator.optional();
      }
      schemaFields[field.name] = validator;
    }
  });

  return z.object(schemaObject);
}