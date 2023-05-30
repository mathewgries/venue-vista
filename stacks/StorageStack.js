import { Bucket, Table } from "sst/constructs";

export function StorageStack({ stack, app }) {
    // Create an S3 bucket
    const bucket = new Bucket(stack, "Uploads");
    // Create the DynamoDB table
    const table = new Table(stack, "Users", {
        fields: {
            PK: "string",
            SK: "string",
        },
        primaryIndex: { partitionKey: "PK", sortKey: "SK" },
    });

    return {
        table,
        bucket,
    };
}