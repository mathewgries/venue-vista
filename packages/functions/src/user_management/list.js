import { Table } from "sst/node/table";
import handler from "@venue-vista/core/src/handler";
import dynamoDb from "@venue-vista/core/src/dynamodb";

export const main = handler(async (event) => {
  const user_id = event.requestContext.authorizer.iam.cognitoIdentity.identityId;
  const entity_type = "USER"
  
  const params = {
    TableName: Table.Users.tableName,
    KeyConditionExpression: "PK = :PK",
    ExpressionAttributeValues: {
      ":PK": `${entity_type}#${user_id}`,
    },
  };

  const result = await dynamoDb.query(params);

  return result.Items;
});