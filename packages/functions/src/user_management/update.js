import { Table } from "sst/node/table";
import handler from "@venue-vista/core/src/handler";
import dynamoDb from "@venue-vista/core/src/dynamodb";

export const main = handler(async (event) => {
  const data = JSON.parse(event.body);
  const userId = event.requestContext.authorizer.iam.cognitoIdentity.identityId;

  const params = {
    TableName: Table.Users.tableName,
    Key: {
      PK: `USER#${userId}`,
      SK: `USER#${userId}#META`,
    },
    UpdateExpression: `SET 
      UserName = :UserName,
      Biography = :Biography,
      Address = :Address,
      DateOfBirth = :DateOfBirth,
      ContactInfo = :ContactInfo,
      SiteLinks = :SiteLinks,
      Profiles = :Profiles,
      ModifyDate = :ModifyDate
      `,
    ExpressionAttributeValues: {
      ":UserName": data.UserName,
      ":Biography": data.Biography,
      ":Address": data.Address,
      ":DateOfBirth": data.DateOfBirth,
      ":ContactInfo": data.ContactInfo,
      ":SiteLinks": data.SiteLinks,
      ":Profiles": data.Profiles,
      ":ModifyDate": Date.now()
    },
    ReturnValues: "ALL_NEW",
  };

  await dynamoDb.update(params);

  return { status: true };
});