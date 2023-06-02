import { Api, use } from "sst/constructs";
import { UsersStorageStack } from "./UsersStorageStack";

export function UsersApiStack({ stack, app }) {
  const { table } = use(UsersStorageStack);

  // Create the API
  const api = new Api(stack, "UsersApi", {
    defaults: {
      authorizer: "iam",
      function: {
        bind: [table],
      },
    },
    routes: {
      "POST /users": "packages/functions/src/user_management/create.main",
      "GET /users/{id}": "packages/functions/src/user_management/get.main",
      "GET /users": "packages/functions/src/user_management/list.main",
      "PUT /users/{id}": "packages/functions/src/user_management/update.main",
      "DELETE /users/{id}": "packages/functions/src/user_management/delete.main",
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