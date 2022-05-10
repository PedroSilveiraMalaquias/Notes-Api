import handler from "./util/handler";
import dynamoDb from "./util/dynamodb";

export const main = handler(async (event) => {
  const params = {
    TableName: process.env.TABLE_NAME,
    // 'Key' defines the partition key and sort key of the item to be removed
    Key: {
      userId: "123", // The id of the author
      noteId: event.pathParameters.id, // The id of the note from the path
    },
  };
  await dynamoDb.delete(params);
  return { status: true };
});
/*
curl -X DELETE https://nzph28dq7l.execute-api.us-east-1.amazonaws.com/notes/bae73320-cd4e-11ec-9f3d-1b7bf3f97961

*/
