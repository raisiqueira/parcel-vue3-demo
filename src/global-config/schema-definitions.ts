import { type App, type InjectionKey } from "vue";
import { schemaDefinitions, type SchemaDefinitions } from "../definitions/schema-definitions";

export const SchemaDefinitionsSymbol: InjectionKey<SchemaDefinitions> = Symbol();

export function useSchemaDefinitions(app: App) {
  return app.provide(SchemaDefinitionsSymbol, schemaDefinitions);
}