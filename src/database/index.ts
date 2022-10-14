import mysql from "serverless-mysql";
import { SQLStatement } from "sql-template-strings";

require("dotenv").config();

const databaseConnection = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_JEOPARDY_USER,
    password: process.env.MYSQL_JEOPARDY_PASSWORD,
  },
});

export const query = async (queryString: SQLStatement): Promise<any> => {
  try {
    const results = await databaseConnection.query(queryString.sql);
    return results;
  } catch (error) {
    return { error };
  } finally {
    await databaseConnection.end();
  }
};
