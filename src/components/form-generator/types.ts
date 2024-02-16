type FormGeneratorFieldTypes = "text" | "checkbox" | "array";

interface FormGeneratorField {
  /** The field to be used (text, number, color picker, etc). */
  as: FormGeneratorFieldTypes;
  /** The name of the form field. Former `model` field in the VFG. */
  name: string;
  /** The label of the form field. If it is not present, the label will be the name. */
  label?: string;
  /** The initial value of the field. */
  initialValue?: string | number | boolean;
  /** Nested forms */
  fields?: FormGeneratorField[];
  /** A boolean to check if the field is required or not. */
  isRequired?: boolean;
}

interface FormGeneratorSchema {
  /** The Django Serializer used to mount the form */
  serializer: string;
  fields: FormGeneratorField[];
}

export { type FormGeneratorSchema, type FormGeneratorField };
