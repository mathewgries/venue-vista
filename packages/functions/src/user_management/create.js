import { Table } from "sst/node/table";
import * as uuid from "uuid";
import handler from "../../../core/src/handler";
import dynamoDb from "../../../core/src/dynamodb";

export const main = handler(async (event) => {
  const data = JSON.parse(event.body);
  const userId = event.requestContext.authorizer.iam.cognitoIdentity.identityId;

  const params = {
    TableName: Table.Users.tableName,
    Item: {
      // The attributes of the item to be created
      PK: userId, // The id of the author
      SK: uuid.v1(), // A unique uuid
      content: data.content, // Parsed from request body
      attachment: data.attachment, // Parsed from request body
      createdAt: Date.now(), // Current Unix timestamp
    },
  };

  await dynamoDb.put(params);

  return params.Item;
});