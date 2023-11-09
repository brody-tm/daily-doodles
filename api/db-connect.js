import mysql from "mysql"
    
export const dbConnection = mysql.createConnection(
{
    host:"dailydoodles.cbllhgiepenr.us-east-2.rds.amazonaws.com",
    user:"admin",
    password:"DD_2324!cS2E0",
    database: "DailyDoodlesDB"
  });
