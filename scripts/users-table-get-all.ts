import { Database } from "bun:sqlite";

const db = new Database("mydb.sqlite");

async function init() {
  const query = db.query(`SELECT * FROM users`);
  const result = query.all();

  console.log(result);

  db.close();
}
init();
