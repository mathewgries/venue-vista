import { AuthStack } from "./stacks/auth/AuthStack";
import { SSTConfig } from "sst";
import { UsersStorageStack } from "./stacks/user_management/UsersStorageStack"
import { UsersApiStack } from "./stacks/user_management/UsersApiStack";
import { FrontendStack } from "./stacks/FrontendStack";

export default {
  config(_input) {
    return {
      name: "venue-vista",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app
      .stack(UsersStorageStack)
      .stack(UsersApiStack)
      .stack(AuthStack)
      .stack(FrontendStack);
  },
} satisfies SSTConfig;
