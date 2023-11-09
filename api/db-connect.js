import mysql from "mysql";

export const dbConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "4567",
  database: "test",
});
