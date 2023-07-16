import { Table } from "sst/node/table";
import handler from "@venue-vista/core/src/handler";
import dynamoDb from "@venue-vista/core/src/dynamodb";

export const main = handler(async (event) => {
  const data = JSON.parse(event.body);
  const user_id = event.requestContext.authorizer.iam.cognitoIdentity.identityId;
  const pk_prefix = "USER";
  const sk_type = "META"
  const date = Date.now()

  const params = {
    TableName: Table.Users.tableName,
    Item: {
      // The attributes of the item to be created
      PK: `${pk_prefix}#${user_id}`,
      SK: `${pk_prefix}#${user_id}#${sk_type}`,
      EntityType: pk_prefix,
      EntityId: user_id,
      EmailAddress: data.EmailAddress,
      UserName: {
        FirstName: data.FirstName,
        MiddleName: data.MiddleName || null,
        LastName: data.LastName || null
      },
      Biography: data.Biography || null,
      Address: {
        Street: data.Street || null,
        City: data.City || null,
        State: data.State || null,
        ZipCode: data.ZipCode || null
      },
      DateOfBirth: data.DateOfBirth || null,
      ContactInfo: data.ContactInfo || [],
      SiteLinks: data.SiteLinks || [],
      Profiles: data.Profiles || [],
      CreateDate: date,
      ModifyDate: date
    },
  };

  await dynamoDb.put(params);

  return params.Item;
});