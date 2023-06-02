import { StaticSite, use } from "sst/constructs";
import { AuthStack } from "./auth/AuthStack";
import { UsersApiStack } from "./user_management/UsersApiStack"
import { UsersStorageStack } from "./user_management/UsersStorageStack";

export function FrontendStack({ stack, app }) {
  const { auth } = use(AuthStack);
  const { api } = use(UsersApiStack);
  const { bucket } = use(UsersStorageStack);

  // Define our React app
  const site = new StaticSite(stack, "ReactSite", {
    path: "frontend",
    buildOutput: "build",
    buildCommand: "npm run build",
    // Pass in our environment variables
    environment: {
      REACT_APP_API_URL: api.customDomainUrl || api.url,
      REACT_APP_REGION: app.region,
      REACT_APP_BUCKET: bucket.bucketName,
      REACT_APP_USER_POOL_ID: auth.userPoolId,
      REACT_APP_IDENTITY_POOL_ID: auth.cognitoIdentityPoolId,
      REACT_APP_USER_POOL_CLIENT_ID: auth.userPoolClientId,
    },
  });

  // Show the url in the output
  stack.addOutputs({
    SiteUrl: site.url || "http://localhost:3000",
  });
}