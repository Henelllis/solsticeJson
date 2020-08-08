import { APIGatewayProxyHandler } from "aws-lambda";
import { S3 } from "aws-sdk";

const s3 = new S3(); // Pass in opts to S3 if necessary

var getParams = {
  Bucket: process.env.BUCKET_NAME, // your bucket name,
  Key: process.env.FILE_NAME, // path to the object you're looking for
};

export const hello: APIGatewayProxyHandler = async (event, _context) => {
  const s3Obj = await s3.getObject(getParams).promise();

  const objectData = s3Obj.Body.toString("utf-8");
  const parsedData = JSON.parse(objectData);
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: parsedData,
        input: event,
      },
      null,
      2
    ),
  };
};
