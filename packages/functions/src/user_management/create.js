import { Table } from "sst/node/table";
import * as uuid from "uuid";
import handler from "@venue-vista/core/src/handler";
import dynamoDb from "@venue-vista/core/src/dynamodb";

export const main = handler(async (event) => {
  const data = JSON.parse(event.body);
  const user_id = event.requestContext.authorizer.iam.cognitoIdentity.identityId;
  const pk_prefix = "USER";
  const sk_type = "META"
  const date = Date.now()

  let items = [];
  let album_id;

  items.push({
    Put: {
      TableName: Table.Users.tableName,
      Item: {
        PK: `${pk_prefix}#${user_id}`,
        SK: `${pk_prefix}#${user_id}#${sk_type}`,
        entityType: pk_prefix,
        entityId: user_id,
        emailAddress: data.emailAddress,
        username: {
          firstName: data.firstName,
          middleName: data.middleName || null,
          lastName: data.lastName || null
        },
        biography: data.biography || null,
        address: {
          street: data.street || null,
          city: data.city || null,
          state: data.state || null,
          zipCode: data.zipCode || null
        },
        birthdate: data.birthdate || null,
        contactInfo: data.contactInfo || [],
        siteLinks: data.siteLinks || [],
        profiles: data.profiles || [],
        createDate: date,
        modifyDate: date
      },
    }
  })

  album_id = uuid.v1()
  items.push({
    Put: {
      TableName: Table.Users.tableName,
      Item: {
        PK: `${pk_prefix}#${user_id}`,
        SK: `PHOTO_ALBUM#${album_id}`,
        entityType: "PHOTO_ALBUM",
        entityId: album_id,
        photoAlbumName: "Profile Photos",
        imageKeys: [],
        createDate: date,
        modifyDate: date
      },
    }
  })

  album_id = uuid.v1()
  items.push({
    Put: {
      TableName: Table.Users.tableName,
      Item: {
        PK: `${pk_prefix}#${user_id}`,
        SK: `PHOTO_ALBUM#${album_id}`,
        entityType: "PHOTO_ALBUM",
        entityId: album_id,
        photoAlbumName: "Banner Photos",
        imageKeys: [],
        createDate: date,
        modifyDate: date
      },
    }
  })

  album_id = uuid.v1()
  items.push({
    Put: {
      TableName: Table.Users.tableName,
      Item: {
        PK: `${pk_prefix}#${user_id}`,
        SK: `PHOTO_ALBUM#${album_id}`,
        entityType: "PHOTO_ALBUM",
        entityId: album_id,
        photoAlbumName: "Default",
        imageKeys: [],
        createDate: date,
        modifyDate: date
      },
    }
  })

  const params = { TransactItems: items.slice(0) };

  await dynamoDb.transactWrite(params);

  return items;
});