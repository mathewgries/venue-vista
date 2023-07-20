import { Storage } from "aws-amplify";

export async function s3Upload(file) {
    // Validate the file type
    if (!isValidFileType(file.type)) {
        throw new Error("Invalid file type");
    }

    const filename = Date.now();
    // const timestamp = Date.now();
    // const filename = `${timestamp}.${getFileExtension(file.name)}`;
    const stored = await Storage.vault.put(filename, file, {
        contentType: file.type,
        contentDisposition: "inline",
    });

    return stored.key;
}

function getFileExtension(filename) {
    const lastDotIndex = filename.lastIndexOf(".");
    return filename.substring(lastDotIndex + 1);
}

function isValidFileType(fileType) {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    return allowedTypes.includes(fileType);
}
