import mysql from "serverless-mysql";
import { SQLStatement } from "sql-template-strings";

require("dotenv").config();

const config =
  process.env.PROD === "true"
    ? {
        host: process.env.PROD_MYSQL_HOST,
        database: process.env.PROD_MYSQL_DATABASE,
        user: process.env.PROD_MYSQL_JEOPARDY_USER,
        password: process.env.PROD_MYSQL_JEOPARDY_PASSWORD,
      }
    : {
        host: process.env.DEV_MYSQL_HOST,
        database: process.env.DEV_MYSQL_DATABASE,
        user: process.env.DEV_MYSQL_JEOPARDY_USER,
        password: process.env.DEV_MYSQL_JEOPARDY_PASSWORD,
      };

console.log("config", config);

const databaseConnection = mysql({ config });
console.log("databaseConnection", databaseConnection);

export const query = async (queryString: SQLStatement): Promise<any> => {
  try {
    return await databaseConnection.query(queryString.sql);
  } catch (error) {
    return { error };
  } finally {
    await databaseConnection.end();
  }
};
