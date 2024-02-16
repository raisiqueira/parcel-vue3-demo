import { type TypedSchema, type RawFormSchema, type TypedSchemaError } from 'vee-validate'
import { validate, validateObject } from 'vee-validate'
import { inject } from 'vue';
import lodashMerge from "lodash/merge";

import { SchemaDefinitionsSymbol } from "../global-config"
import { type FormGeneratorSchema, type FormGeneratorField } from "../components/form-generator"
import { type SchemaDefinitions } from '../definitions/schema-definitions';

export type Optional<T> = T extends Record<string, any> ? Partial<T> : T | undefined;

export const isObject = (obj: unknown): obj is Record<string, unknown> =>
  obj !== null && !!obj && typeof obj === 'object' && !Array.isArray(obj);

export function keysOf<TRecord extends Record<string, unknown>>(record: TRecord): (keyof TRecord)[] {
  return Object.keys(record);
}

// TODO: type this function.
export function toTypedSchema<TOutput = any, TInput extends FormGeneratorSchema = FormGeneratorSchema>(
  rawSchema: FormGeneratorSchema,
): TypedSchema<TInput, TOutput> {
  const formFieldProperties = mergeSchemaProperties(rawSchema);
  console.log("toTypedSchema", formFieldProperties);
  const schema: TypedSchema = {
    __type: 'VVTypedSchema',
    async parse(values: TInput) {
      // single field
      if (typeof rawSchema === 'string') {
        const result = await validate(values, rawSchema);

        return {
          errors: [
            {
              errors: result.errors,
            },
          ],
        };
      }

      const result = await validateObject<TInput, TOutput>(rawSchema, values);

      return {
        errors: keysOf(result.errors).map(path => {
          const error: TypedSchemaError = {
            path: path as string,
            errors: result.results[path]?.errors || [],
          };

          return error;
        }),
      };
    },
    describe(path) {
      if (!path) {
        return getDescriptionFromExpression(rawSchema);
      }

      if (isObject(rawSchema) && path in rawSchema) {
        return getDescriptionFromExpression((rawSchema as any)[path]);
      }

      return {
        required: false,
        exists: false,
      };
    },
  };

  return schema;
}

function getDescriptionFromExpression(rules: string | Record<string, any>) {
  if (typeof rules === 'string') {
    return {
      exists: true,
      required: rules.includes('required'),
    };
  }

  if (isObject(rules)) {
    return {
      exists: true,
      required: !!rules.required,
    };
  }

  return {
    required: false,
    exists: true,
  };
}

function mergeSchemaProperties(formSchema: FormGeneratorSchema) {
  const availableDefinitions = inject(SchemaDefinitionsSymbol);

  if (!availableDefinitions) {
    console.error("SchemaDefinitions not provided. Please provide the schema definitions.");
    return;
  }

  if (!formSchema) {
    console.error("SchemaDefinitions not provided");
    return;
  }

  if (formSchema.serializer === undefined) {
    console.error("property: serializer is not defined in schema.");
    return;
  }

  const formSchemaSerializer = formSchema.serializer;
  const formSchemaFields = formSchema.fields;

  if (!availableDefinitions?.definitions[formSchemaSerializer] && formSchema.serializer !== "custom") {
    console.error(`Serializer ${formSchemaSerializer} does not exist in available definitions.`);
    return;
  }

  // For those cases want to use custom serializer that is not defined in schema definitions.
  if (formSchemaSerializer === "custom") {
    const customFormFields: FormGeneratorField[] = [];
    formSchemaFields.map((field) => {
      customFormFields.push({ ...field });
    });
    return customFormFields;
  }

  const mergedProperties = lodashMerge(
    availableDefinitions.definitions[formSchemaSerializer].properties,
    availableDefinitions.definitions[formSchemaSerializer].userProperties
  ) as Record<string, Record<string, any>>;

  const requiredFields = availableDefinitions.definitions[formSchemaSerializer].required;
  // The list of fields that will be used to generate the form.
  const formFields: FormGeneratorField[] = [];

  formSchemaFields.map(field => {
    if (!mergedProperties[field.name]) {
      console.error(`model: ${field.name} is undefined`);
      return;
    }

    let fieldProperties = mergedProperties[field.name];

    if ("$ref" in fieldProperties) {
      const refSerializer = fieldProperties["$ref"].split("/").slice(-1);
      fieldProperties = lodashMerge(
        availableDefinitions.definitions[refSerializer].properties,
        fieldProperties,
      );
    }

    const isRequired = requiredFields
          ? requiredFields.includes(field.name)
          : false;

    formFields.push({
      ...fieldProperties,
      ...field,
      ...{ serializer: formSchema.serializer},
      isRequired, // TODO: maybe replace to `required`?
    });
  });
  return formFields;
}

function deleteReadOnlyProperties(schema: SchemaDefinitions | undefined): unknown {
  throw new Error("Function not implemented.");
}