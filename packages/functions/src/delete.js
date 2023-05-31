import { Table } from "sst/node/table";
import handler from "@venue-vista/core/handler";
import dynamoDb from "@venue-vista/core/dynamodb";

export const main = handler(async (event) => {
  const params = {
    TableName: Table.Users.tableName,
    // 'Key' defines the partition key and sort key of the item to be removed
    Key: {
      PK: "123", // The id of the author
      SK: event.pathParameters.id, // The id of the note from the path
    },
  };

  await dynamoDb.delete(params);

  return { status: true };
});