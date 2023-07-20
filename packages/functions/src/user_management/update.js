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
      	username = :username,
      	biography = :biography,
      	address = :address,
      	birthdate = :birthdate,
      	contactInfo = :contactInfo,
      	siteLinks = :siteLinks,
      	profiles = :profiles,
      	modifyDate = :modifyDate
      	`,
		ExpressionAttributeValues: {
			":username": data.username,
			":biography": data.biography,
			":address": data.address,
			":birthdate": data.birthdate,
			":contactInfo": data.contactInfo,
			":siteLinks": data.siteLinks,
			":profiles": data.profiles,
			":modifyDate": Date.now()
		},
		ReturnValues: "ALL_NEW",
	};

	await dynamoDb.update(params);

	return { status: true };
});