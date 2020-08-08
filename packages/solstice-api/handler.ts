import { APIGatewayProxyHandler } from "aws-lambda";
import { Account, JsonFile, Customer } from "solstice-common";
import { getS3JsonFile } from "./getS3JsonFile";

export const customers: APIGatewayProxyHandler = async (event, _context) => {
  try {
    const jsonFileContents: JsonFile = await getS3JsonFile();
    const customerData: Customer[] = jsonFileContents.customers;

    return {
      statusCode: 200,
      body: JSON.stringify(customerData),
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: error,
      }),
      headers: {
        "access-control-allow-origin": "*",
      },
    };
  }
};

export const accounts: APIGatewayProxyHandler = async (event, _context) => {
  try {
    const jsonFileContents: JsonFile = await getS3JsonFile();
    const accountData: Account[] = jsonFileContents.accounts;

    return {
      statusCode: 200,
      body: JSON.stringify(accountData),
      headers: {
        "access-control-allow-origin": "*",
      },
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: error,
      }),
      headers: {
        "access-control-allow-origin": "*",
      },
    };
  }
};
