import * as uuid from "uuid";

export const formatNewAlbum = (props) => {
    const entityType = "PHOTO_ALBUM"
    const entityId = uuid.v1()

    return {
        SK: `${entityType}#${entityId}`,
        entityType,
        entityId,
        photoAlbumName: props.photoAlbumName,
        imageKeys: props.imageKeys || [],
    }
}

export const formatUpdatedAlbum = (photoAlbum, newKey) => {
    return {
        ...photoAlbum,
        imageKeys: [...photoAlbum.imageKeys, newKey],
    }
}