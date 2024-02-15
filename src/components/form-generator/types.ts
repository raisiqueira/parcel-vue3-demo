interface FormGeneratorField {}

interface FormGeneratorSchema {
  /** The Django Serializer used to mount the form */
  serializer: string;
  fields: FormGeneratorField[];
}

export { type FormGeneratorSchema, type FormGeneratorField };
