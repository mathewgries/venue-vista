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
            SK: `${data.entityType}#${data.entityId}`,
        },
        UpdateExpression: `SET 
        photoAlbumName = :photoAlbumName,
        imageKeys = :imageKeys,
        modifyDate = :modifyDate
      `,
        ExpressionAttributeValues: {
            ":photoAlbumName": data.photoAlbumName,
            ":imageKeys": data.imageKeys,
            ":modifyDate": Date.now()
        },
        ReturnValues: "ALL_NEW",
    };

    await dynamoDb.update(params);

    return { status: true };
});