import { S3 } from "aws-sdk";
import { JsonFile } from "solstice-common";

const s3 = new S3(); // Pass in opts to S3 if necessary

var getParams = {
  Bucket: process.env.BUCKET_NAME, // your bucket name,
  Key: process.env.FILE_NAME, // path to the object you're looking for
};

export const getS3JsonFile = async () => {
  let s3Obj;

  try {
    s3Obj = await s3.getObject(getParams).promise();
  } catch (error) {
    throw new Error(error);
  }

  const objectData: string = s3Obj.Body.toString("utf-8");
  const parsedData: JsonFile = JSON.parse(objectData);
  return parsedData;
};
