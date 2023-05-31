import { Table } from "sst/node/table";
import handler from "@venue-vista/core/handler";
import dynamoDb from "@venue-vista/core/dynamodb";

export const main = handler(async () => {
  const params = {
    TableName: Table.Users.tableName,
    // 'KeyConditionExpression' defines the condition for the query
    // - 'userId = :userId': only return items with matching 'userId'
    //   partition key
    KeyConditionExpression: "PK = :PK",
    // 'ExpressionAttributeValues' defines the value in the condition
    // - ':userId': defines 'userId' to be the id of the author
    ExpressionAttributeValues: {
      ":PK": "123",
    },
  };

  const result = await dynamoDb.query(params);

  // Return the matching list of items in response body
  return result.Items;
});