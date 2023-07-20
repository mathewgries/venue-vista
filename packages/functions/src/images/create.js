import { Table } from "sst/node/table";
import * as uuid from "uuid";
import handler from "@venue-vista/core/src/handler";
import dynamoDb from "@venue-vista/core/src/dynamodb";

export const main = handler(async (event) => {
    const data = JSON.parse(event.body);
    const album_id = uuid.v1();
    const pk_prefix = "USER"
    const sk_type = "PHOT_ALBUM"
    const date = Date.now()

    const params = {
        TableName: Table.Users.tableName,
        Item: {
            PK: `${pk_prefix}#${user_id}`,
            SK: `${sk_type}#${album_id}`,
            entityType: sk_type,
            entityId: album_id,
            photoAlbumName: data.photoAlbumName,
            imageKeys: data.imageKeys || [],
            createDate: date,
            modifyDate: date
        },
    };

    await dynamoDb.put(params);

    return params.Item;
});