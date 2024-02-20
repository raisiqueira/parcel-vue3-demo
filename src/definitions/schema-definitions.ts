const schemaDefinitions = {
  definitions: {
    Campaign: {
      required: ['name', "terms", "description"],
      type: "object",
      properties: {
        ID: {
          title: "ID",
          type: "integer",
          readOnly: true
        },
        name: {
          title: "Name",
          type: "string",
          description: "The name, or goal of your campaign.",
          minLength: 3,
          maxLength: 250,
        },
        description: {
          title: "Description",
          type: "string",
          description: "The description of your campaign.",
        },
        terms: {
          title: "Terms",
          type: "boolean",
          description: "The terms and conditions.",
        },
      },
    }
  }
}

type SchemaDefinitions = typeof schemaDefinitions;

export { schemaDefinitions, type SchemaDefinitions };