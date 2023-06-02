import { Api, use } from "sst/constructs";
import { StorageStack } from "./StorageStack";

export function ApiStack({ stack, app }) {
  const { table } = use(StorageStack);

  // Create the API
  const api = new Api(stack, "UsersApi", {
    defaults: {
      authorizer: "iam",
      function: {
        bind: [table],
      },
    },
    routes: {
      "POST /users": "packages/functions/src/create.main",
      "GET /users/{id}": "packages/functions/src/get.main",
      "GET /users": "packages/functions/src/list.main",
      "PUT /users/{id}": "packages/functions/src/update.main",
      "DELETE /users/{id}": "packages/functions/src/delete.main",
    },
  });

  // Show the API endpoint in the output
  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  // Return the API resource
  return {
    api,
  };
}