import mysql from "mysql2/promise";

export async function query({ query, values = [] }) {
  const db = await mysql.createConnection({
    host: "localhost",   
    user: "root",       
    password: "1234", 
    database: "crud_db", 
  });

  const [results] = await db.execute(query, values);
  return results;
}
