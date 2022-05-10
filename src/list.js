import handler from "./util/handler";
import dynamoDb from "./util/dynamodb";
export const main = handler(async () => {
  const params = {
    TableName: process.env.TABLE_NAME,
    // 'KeyConditionExpression' defines the condition for the query
    // - 'userId = :userId': only return items with matching 'userId'
    // partition key
    KeyConditionExpression: "userId = :userId",
    // 'ExpressionAttributeValues' defines the value in the condition
    // - ':userId': defines 'userId' to be the id of the author
    ExpressionAttributeValues: {
      ":userId": "123",
    },
  };
  const result = await dynamoDb.query(params);
  // Return the matching list of items in response body
  return result.Items;
});

/*
    curl https://nzph28dq7l.execute-api.us-east-1.amazonaws.com/notes
    response:
    {"attachment":"hello.jpg","content":"Hello World","createdAt":1651849856850,"noteId":"bae73320-cd4e-11ec-9f3d-1b7bf3f97961","userId":"123"}]
*/
