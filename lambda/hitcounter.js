import { Lambda } from "@aws-sdk/client-lambda";
import { DynamoDB } from "@aws-sdk/client-dynamodb";

export async function handler(event) {
  console.log("request:", JSON.stringify(event, undefined, 2));

  // create AWS SDK clients
  const dynamo = new DynamoDB();
  const lambda = new Lambda();

  // update dynamo entry for "path" with hits++
  await dynamo.updateItem({
    TableName: process.env.HITS_TABLE_NAME,
    Key: { path: { S: event.path } },
    UpdateExpression: "ADD hits :incr",
    ExpressionAttributeValues: { ":incr": { N: "1" } },
  });

  // call downstream function and capture response
  console.log("upstream event: ", JSON.stringify(event));
  const resp = await lambda.invokeAsync({
    FunctionName: process.env.DOWNSTREAM_FUNCTION_NAME,
    Payload: JSON.stringify(event),
  });

  console.log("downstream  response:", JSON.stringify(resp, undefined, 2));
  console.log("downstream  response:", typeof resp);
  const respString = JSON.stringify(resp.Payload);
  console.log("resp string:", typeof respString);
  console.log("resp string:", respString);
  const respObj = JSON.parse(respString);
  console.log("resp obj:", typeof respObj);
  console.log("resp obj:", respObj);
  console.log("downstream  payload:", JSON.stringify(respObj.Payload, undefined, 2));

  // return response back to upstream caller
  //return JSON.parse(resp.Payload);
  //return respObj.Payload;
  return {
    statusCode: 200,
    headers: { "Content-Type": "text/plain" },
    body: `Hello, CDK! You've hit ${event.path}\n`,
  };
}
