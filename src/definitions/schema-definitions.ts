const schemaDefinitions = {
  definitions: {
    Campaign: {
      required: ['name', 'description'],
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
        },
        description: {
          title: "Description",
          type: "string",
          description: "The description of your campaign.",
        },
      },
    }
  }
}

type SchemaDefinitions = typeof schemaDefinitions;

export { schemaDefinitions, type SchemaDefinitions };