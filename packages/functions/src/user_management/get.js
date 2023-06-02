import { Table } from "sst/node/table";
import handler from "../../../core/src/handler";
import dynamoDb from "../../../core/src/dynamodb";

export const main = handler(async (event) => {
  const userId = event.requestContext.authorizer.iam.cognitoIdentity.identityId;
  
  const params = {
    TableName: Table.Users.tableName,
    // 'Key' defines the partition key and sort key of the item to be retrieved
    Key: {
      PK: userId, // The id of the author
      SK: event.pathParameters.id, // The id of the note from the path
    },
  };

  const result = await dynamoDb.get(params);
  if (!result.Item) {
    throw new Error("Item not found.");
  }

  // Return the retrieved item
  return result.Item;
});