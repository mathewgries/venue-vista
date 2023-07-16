import { Table } from "sst/node/table";
import handler from "@venue-vista/core/src/handler";
import dynamoDb from "@venue-vista/core/src/dynamodb";

export const main = handler(async (event) => {
  const entity_type = "USER"
  const user_id = event.requestContext.authorizer.iam.cognitoIdentity.identityId;
  
  const params = {
    TableName: Table.Users.tableName,
    // 'Key' defines the partition key and sort key of the item to be retrieved
    Key: {
      PK: `${entity_type}#${user_id}`,
      SK: `${entity_type}#${user_id}#META`, // The id of the note from the path
    },
  };

  const result = await dynamoDb.get(params);
  if (!result.Item) {
    throw new Error("Item not found.");
  }

  // Return the retrieved item
  return result.Item;
});